const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('./Category.js');

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        default: ''
    },
    category: categorySchema,
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
        required: true,
        default: ''
    },
    //Array of images URL
    product_images: [{
        type: String,
        required: false,
        default: ''
    }],
});

module.exports = mongoose.model('Product', productSchema);

