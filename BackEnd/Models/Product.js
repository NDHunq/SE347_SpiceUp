const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    averageRatings: {
        type: Number,
        required: true,
        default: 0
    },
    productStatus: {
        type: String,
        required: true,
        default: 'active'
    },
    brand: {
        type: String,
        required: true,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    //Array of images URL
    product_images: [{
        type: String,
        required: false,
        default: ''
    }],
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

