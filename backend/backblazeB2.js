import express from 'express';
import cors from 'cors';
import multer from 'multer';
import B2 from 'backblaze-b2';
import dotenv from 'dotenv';
import axios from 'axios';
import admin from 'firebase-admin';
import fs from 'fs';

dotenv.config();

const app = express();
// middlewares
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync('firebase-service-account.json', 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'https://mithui-alumni-association.vercel.app'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Initialize B2
const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    applicationKey: process.env.B2_APPLICATION_KEY
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// B2 Auth Check
app.get('/api/check-auth', async (req, res) => {
    try {
        const authResponse = await b2.authorize();
        res.json({
            success: true,
            message: 'B2 authorization successful',
            allowed: authResponse.data.allowed
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// B2 Permissions
app.get('/api/check-permissions', async (req, res) => {
    try {
        const authResponse = await b2.authorize();
        const capabilities = authResponse.data.allowed.capabilities || [];
        const canDelete = capabilities.includes('deleteFiles');
        res.json({ success: true, canDelete, capabilities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Multer Config
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Upload File to B2
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    try {
        await b2.authorize();
        const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
            bucketId: process.env.B2_BUCKET_ID
        });

        const fileName = `news-events/${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;

        const { data } = await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName,
            data: req.file.buffer,
            contentType: req.file.mimetype
        });

        const fileUrl = `https://f002.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}`;

        res.json({ success: true, fileUrl, fileName: data.fileName });
    } catch (error) {
        console.error('B2 upload error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete File from B2
app.delete('/api/delete', async (req, res) => {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return res.status(400).json({ success: false, message: 'File name is required' });
        }

        await b2.authorize();
        const fileNameOnly = fileName.includes('/') ? fileName.split('/').pop() : fileName;

        const listFilesResponse = await b2.listFileNames({
            bucketId: process.env.B2_BUCKET_ID,
            maxFileCount: 100
        });

        const files = listFilesResponse?.data?.files || [];
        const matchingFile = files.find(file =>
            file.fileName === fileName || file.fileName.endsWith(fileNameOnly)
        );

        if (!matchingFile) {
            return res.status(404).json({
                success: true,
                message: 'File deleted from database, but not found in B2 storage'
            });
        }

        await b2.deleteFileVersion({
            fileId: matchingFile.fileId,
            fileName: matchingFile.fileName
        });

        res.json({
            success: true,
            message: 'File deleted successfully from both database and storage',
            deletedFile: matchingFile.fileName
        });
    } catch (error) {
        console.error("Unexpected error in delete endpoint:", error);
        res.status(500).json({ success: false, message: `Unexpected error: ${error.message}` });
    }
});

// M-PESA OAuth Token
async function getOAuthToken() {
    const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
    const response = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        { auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET } }
    );
    return response.data.access_token;
}

// M-PESA STK Push
async function sendSTKPush(phoneNumber) {
    const token = await getOAuthToken();

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(
        process.env.BUSINESS_SHORTCODE + process.env.PASSKEY + timestamp
    ).toString('base64');

    const requestData = {
        BusinessShortCode: process.env.BUSINESS_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 200,
        PartyA: phoneNumber,
        PartyB: process.env.BUSINESS_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "AppMithuiAlumni",
        TransactionDesc: "Registration Fee"
    };

    const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        requestData,
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
}

// STK Push Endpoint
app.post('/api/stk-push', async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const result = await sendSTKPush(phoneNumber);
        res.json({ success: true, response: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// M-PESA Callback Handler
app.post('/payment_callback', async (req, res) => {
    const callbackData = req.body;

    const success = callbackData?.Body?.stkCallback?.ResultCode === 0;

    const docData = {
        status: success ? "Success" : "Failed",
        timestamp: new Date().toISOString(),
        checkoutRequestID: callbackData?.Body?.stkCallback?.CheckoutRequestID || null,
        phoneNumber: callbackData?.Body?.stkCallback?.CallbackMetadata?.Item?.find(item => item.Name === 'PhoneNumber')?.Value || null,
        rawData: callbackData
    };

    try {
        await db.collection("mpesa_payments").add(docData);
        console.log(success ? "Payment Successful!" : "Payment Failed!", docData.checkoutRequestID);
    } catch (error) {
        console.error("Error saving to Firestore:", error);
    }

    res.sendStatus(200);
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
