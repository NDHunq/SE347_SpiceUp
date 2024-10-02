const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    review_image: [{
        type: String,
        required: false,
        default: ''
    }]
});

module.exports = mongoose.model('Review', reviewSchema);