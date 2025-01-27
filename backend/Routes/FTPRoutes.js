
const express = require('express');
const router = express.Router();
const FTPHandler = require('../Utils/FTPHandler');

// Example FTP configuration (replace with actual values or load from environment variables)
const ftpConfig = {
    host: process.env.FTP_HOST || '127.0.0.1',
    user: process.env.FTP_USER || 'ftp_user',
    password: process.env.FTP_PASSWORD || 'ftp_password',
    secure: false,
};

const ftpHandler = new FTPHandler(ftpConfig);

// List files in a directory
router.get('/list', async (req, res) => {
    const { path } = req.query;
    try {
        await ftpHandler.connect();
        const files = await ftpHandler.list(path || '/');
        await ftpHandler.disconnect();
        res.status(200).json({ files });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload a file
router.post('/upload', async (req, res) => {
    const { localPath, remotePath } = req.body;
    try {
        await ftpHandler.connect();
        await ftpHandler.upload(localPath, remotePath);
        await ftpHandler.disconnect();
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Download a file
router.post('/download', async (req, res) => {
    const { remotePath, localPath } = req.body;
    try {
        await ftpHandler.connect();
        await ftpHandler.download(remotePath, localPath);
        await ftpHandler.disconnect();
        res.status(200).json({ message: 'File downloaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// Create a new directory on the FTP server
router.post('/create-directory', async (req, res) => {
    const { path } = req.body;
    try {
        await ftpHandler.connect();
        await ftpHandler.client.ensureDir(path); // Ensure the directory exists or create it
        await ftpHandler.disconnect();
        res.status(200).json({ message: `Directory '${path}' created successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
