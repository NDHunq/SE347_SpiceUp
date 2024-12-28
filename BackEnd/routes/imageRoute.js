const express = require('express');
const { upload, uploadFileToGridFS } = require('../middlewares/UploadImage/UploadImage');
const { uploadFile, getImage } = require('../controllers/imageController');
const authenticate = require("../middlewares/auth/auth");

const router = express.Router();

router.post('/upload', authenticate, upload, uploadFileToGridFS, uploadFile);
router.get('/:fileId', authenticate, getImage);

module.exports = router;