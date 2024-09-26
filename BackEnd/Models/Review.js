const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    product_id: {
        type: String,
        required: true
    },
    review_image: [{
        type: String,
        required: false,
        default: ''
    }]
});

module.exports = mongoose.model('Review', reviewSchema);