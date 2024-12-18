// controllers/imageController.js
const Image = require('../models/image');
const mongoose = require('mongoose');
const { getGridFSBucket } = require('../config/gridfs/gridfs');

const uploadFile = (req, res) => {
    const gridfsBucket = getGridFSBucket();

    // Kiểm tra xem file có tồn tại fileId ở bước trước không
    if (!req.fileId) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Tạo một document mới trong collection images
    const newImage = new Image({
        filename: req.file.originalname,
        fileId: req.fileId,
    });

    // Lưu document vào collection images
    newImage.save()
        .then((savedImage) => {
            return res.status(200).json({
                status: 'success',
                code: 200,
                message: 'File uploaded successfully',
                file: {
                    fileId: savedImage?.fileId,
                    filename: savedImage?.filename,
                },
                errors: null
            });
        })
        .catch((err) => {
            return res.status(500).json(
                {
                    status: 'error',
                    code: 500,
                    message: 'Internal server error',
                    data: null,
                    errors: err.message
                }
            );
        });
};

// API trả về ảnh từ GridFS dựa trên fileId
const getImage = async (req, res) => {
    const { fileId } = req.params;
    const gridfsBucket = getGridFSBucket();

    try {
        // Lấy thông tin file từ GridFS
        const file = await gridfsBucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const fileInfo = file[0];
        const contentType = fileInfo.contentType || 'application/octet-stream';

        // Cài đặt header Content-Type
        res.setHeader('Content-Type', contentType);

        const readstream = gridfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

        readstream.on('data', (chunk) => {
            res.write(chunk);
        });

        readstream.on('end', () => {
            res.end();
        });

        readstream.on('error', (err) => {
            res.status(404).json(
                {
                    status: 'error',
                    code: 404,
                    message: 'File not found',
                    data: null,
                    errors: err.message
                }
            );
        });
    }
    catch (err) {
        res.status(500).json(
            {
                status: 'error',
                code: 500,
                message: 'Internal server error',
                data: null,
                errors: err.message
            }
        );
    }

};

module.exports = { uploadFile, getImage };