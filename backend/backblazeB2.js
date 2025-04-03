import express from 'express';
import cors from 'cors';
import multer from 'multer';
import B2 from 'backblaze-b2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'https://mithui-alumni-association.vercel.app'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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

app.get('/api/check-permissions', async (req, res) => {
    try {
        const authResponse = await b2.authorize();
        console.log("Full auth response:", JSON.stringify(authResponse.data));

        const capabilities = authResponse.data.allowed.capabilities || [];
        const canDelete = capabilities.includes('deleteFiles');

        res.json({
            success: true,
            canDelete,
            capabilities
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

app.delete('/api/delete', async (req, res) => {
    console.log("Delete request received");

    try {
        const { fileName } = req.body;

        if (!fileName) {
            console.log("No fileName provided in request");
            return res.status(400).json({ success: false, message: 'File name is required' });
        }

        console.log("Attempting to delete:", fileName);

        try {
            console.log("Authorizing with B2...");
            await b2.authorize();
            console.log("B2 authorization successful");
        } catch (authError) {
            console.error("B2 authorization failed:", authError);
            return res.status(500).json({ success: false, message: `B2 authorization failed: ${authError.message}` });
        }

        const fileNameOnly = fileName.includes('/') ? fileName.split('/').pop() : fileName;
        console.log("Extracted filename:", fileNameOnly);

        try {
            console.log("Listing files in bucket:", process.env.B2_BUCKET_ID);

            const listFilesResponse = await b2.listFileNames({
                bucketId: process.env.B2_BUCKET_ID,
                maxFileCount: 100
            });

            console.log("List files response type:", typeof listFilesResponse);
            console.log("List files response structure:",
                JSON.stringify(Object.keys(listFilesResponse || {})));
            console.log("List files data structure:",
                JSON.stringify(Object.keys(listFilesResponse?.data || {})));

            const files = listFilesResponse?.data?.files || [];
            console.log(`Found ${files.length} files in bucket`);

            const matchingFile = files.find(file =>
                file.fileName === fileName || file.fileName.endsWith(fileNameOnly)
            );

            if (!matchingFile) {
                console.log("No matching file found");
                return res.status(404).json({
                    success: true,
                    message: 'File deleted from database, but not found in B2 storage'
                });
            }

            console.log("Found matching file:", matchingFile.fileName);

            await b2.deleteFileVersion({
                fileId: matchingFile.fileId,
                fileName: matchingFile.fileName
            });

            console.log(`File deleted: ${matchingFile.fileName}`);

            return res.json({
                success: true,
                message: 'File deleted successfully from both database and storage',
                deletedFile: matchingFile.fileName
            });
        } catch (b2Error) {
            console.error("B2 operation error:", b2Error);
            return res.status(500).json({ success: false, message: `B2 error: ${b2Error.message}` });
        }

    } catch (error) {
        console.error("Unexpected error in delete endpoint:", error);
        return res.status(500).json({ success: false, message: `Unexpected error: ${error.message}` });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`B2 Upload server running on port ${PORT}`));