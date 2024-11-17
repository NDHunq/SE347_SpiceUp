const multer = require('multer');
const { getGridFSBucket } = require('../../config/gridfs/gridfs');

// Sử dụng memory storage để giữ file trong bộ nhớ tạm thời
const storage = multer.memoryStorage();

// Middleware để upload file
const upload = multer({ storage: storage }).single('file'); // 'file' là tên field trong form

// Middleware để upload ảnh vào GridFS
const uploadFileToGridFS = (req, res, next) => {
    // Kiểm tra xem file có được upload hay chưa
    if (!req.file) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Bad request',
                data: null,
                errors: 'No file uploaded'
            }
        );
    }

    const gridfsBucket = getGridFSBucket();

    // Tạo một writable stream để lưu file vào GridFS
    const writestream = gridfsBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
    });

    // Tạo một readable stream từ buffer của file
    const readableStream = require('stream').Readable.from(req.file.buffer);
    readableStream.pipe(writestream);

    // Xử lý sự kiện khi file được lưu thành công
    writestream.on('finish', () => {
        req.fileId = writestream?.id; // Lưu fileId vào req để tiếp tục xử lý trong controller
        next();
    });

    writestream.on('error', (err) => {
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

module.exports = { upload, uploadFileToGridFS };
