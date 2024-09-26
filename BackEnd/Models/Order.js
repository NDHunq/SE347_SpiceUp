const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the order collection
const orderSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    date_ordered: {
        type: Date,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        required: true,
        default: 'Cash'
    },
    order_items: [{
        type: String,
        ref: 'OrderItem',
        default: ''
    }],
    shipping: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = mongoose.model('Order', orderSchema);