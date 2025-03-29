import express from 'express';
import cors from 'cors';
import multer from 'multer';
import B2 from 'backblaze-b2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const b2 = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    applicationKey: process.env.B2_APPLICATION_KEY
});

app.get('/api/check-auth', async (req, res) => {
    try {
        const authResponse = await b2.authorize();
        res.json({
            success: true,
            message: 'B2 authorization successful',
            allowed: authResponse.data.allowed
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.toString()
        });
    }
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

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

        res.json({
            success: true,
            fileUrl,
            fileName: data.fileName
        });
    } catch (error) {
        console.error('B2 upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error uploading file to B2'
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`B2 Upload server running on port ${PORT}`));