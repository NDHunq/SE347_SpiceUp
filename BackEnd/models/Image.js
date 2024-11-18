const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now
    },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;