const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the cart collection
const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product: [{
        product_ID: {
            type: String,
            ref: 'Product'
        },
        quantities: {
            type: Number,
            required: true,
            default: 1
        }
    }]
});

module.exports = mongoose.model('Cart', cartSchema);