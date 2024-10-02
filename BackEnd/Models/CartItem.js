const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('../Models/Product.js');

// Define the schema for the cart collection
const cartItemSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantities: {
        type: Number,
        required: true,
        default: 1
    },
    subTotal: {
        type: Number,
        required: true,
        default: 0
    }
});

//middleware to calculate the subtotal of an item
cartItemSchema.pre('save', async function (next) {
    try {
        const product = await Product.findById(this.product_id);

        if(!product) {
            return next(new Error('Product not found'));
        }

        this.subTotal = product.price * this.quantities;
        next();
    }
    catch (err) {
        next(err);
    }
})
const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;