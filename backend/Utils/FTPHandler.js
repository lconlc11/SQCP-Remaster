
const ftp = require('basic-ftp');

class FTPHandler {
    constructor(config) {
        this.config = config; // FTP configuration object
    }

    async connect() {
        this.client = new ftp.Client();
        this.client.ftp.verbose = true; // Enable verbose mode for debugging
        try {
            await this.client.access({
                host: this.config.host,
                user: this.config.user,
                password: this.config.password,
                secure: this.config.secure || false,
            });
            console.log("Connected to FTP server");
        } catch (err) {
            console.error("FTP Connection Error:", err);
            
        if (err.code === 'ENOTFOUND') {
            console.error("FTP Error: Host not found.");
            throw new Error("FTP Error: Host not found.");
        } else if (err.code === 'EACCES') {
            console.error("FTP Error: Permission denied.");
            throw new Error("FTP Error: Permission denied.");
        } else {
            console.error("FTP Error:", err.message);
            throw err;
        }
    
        }
    }

    async list(path = "/") {
        try {
            return await this.client.list(path);
        } catch (err) {
            console.error("FTP List Error:", err);
            
        if (err.code === 'ENOTFOUND') {
            console.error("FTP Error: Host not found.");
            throw new Error("FTP Error: Host not found.");
        } else if (err.code === 'EACCES') {
            console.error("FTP Error: Permission denied.");
            throw new Error("FTP Error: Permission denied.");
        } else {
            console.error("FTP Error:", err.message);
            throw err;
        }
    
        }
    }

    
async upload(localPath, remotePath) {
    this.client.trackProgress((info) => {
        console.log(`Transferred: ${info.bytes} bytes of ${info.bytesOverall} bytes for file: ${info.name}`);
    });

        try {
            await this.client.uploadFrom(localPath, remotePath);
            console.log(`Uploaded ${localPath} to ${remotePath}`);
        } catch (err) {
            console.error("FTP Upload Error:", err);
            
        if (err.code === 'ENOTFOUND') {
            console.error("FTP Error: Host not found.");
            throw new Error("FTP Error: Host not found.");
        } else if (err.code === 'EACCES') {
            console.error("FTP Error: Permission denied.");
            throw new Error("FTP Error: Permission denied.");
        } else {
            console.error("FTP Error:", err.message);
            throw err;
        }
    
        }
    }

    
async download(remotePath, localPath) {
    this.client.trackProgress((info) => {
        console.log(`Transferred: ${info.bytes} bytes of ${info.bytesOverall} bytes for file: ${info.name}`);
    });

        try {
            await this.client.downloadTo(localPath, remotePath);
            console.log(`Downloaded ${remotePath} to ${localPath}`);
        } catch (err) {
            console.error("FTP Download Error:", err);
            
        if (err.code === 'ENOTFOUND') {
            console.error("FTP Error: Host not found.");
            throw new Error("FTP Error: Host not found.");
        } else if (err.code === 'EACCES') {
            console.error("FTP Error: Permission denied.");
            throw new Error("FTP Error: Permission denied.");
        } else {
            console.error("FTP Error:", err.message);
            throw err;
        }
    
        }
    }

    async disconnect() {
        await this.client.close();
        console.log("Disconnected from FTP server");
    }
}

module.exports = FTPHandler;
