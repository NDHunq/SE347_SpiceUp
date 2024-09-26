const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        ref: 'Product'
    },
    order_id: {
        type: String,
        required: true,
        default: ''
    },
    quantities: {
        type: Number,
        required: true,
        default: 1
    },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);