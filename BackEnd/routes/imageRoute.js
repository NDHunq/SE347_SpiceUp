const express = require('express');
const { upload, uploadFileToGridFS } = require('../middlewares/UploadImage/UploadImage');
const { uploadFile, getImage } = require('../controllers/imageController');

const router = express.Router();

router.post('/upload', upload, uploadFileToGridFS, uploadFile);
router.get('/:fileId', getImage);

module.exports = router;