const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('.//Product.js');

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
    sub_total: {
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

        this.sub_total = ((1 - product.discount) * product.price * this.quantities).toFixed(0);
        next();
    }
    catch (err) {
        next(err);
    }
})
const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;