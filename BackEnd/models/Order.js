const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartItem = require('./CartItem.js');
const Product = require('./Product.js');

// Define the schema for the order collection
const orderSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date_ordered: {
        type: Date,
        required: true,
        default: Date.now()
    },
    order_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        required: true,
        default: ''
    }],
    order_items_post: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: {}
    },
    total_cost: {
        type: Number,
        required: true,
        default: 0
    },
    payment_method: {
        type: String,
        required: true,
        default: 'Cash'
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    order_notes: {
        type: String,
        required: false,
        default: ''
    }
});

// Middleware to calculate the total cost of an order
orderSchema.pre('save', async function (next){
    try {
        if (this.order_items.length !== 0){
            const cartItems = await CartItem.find({ _id: { $in: this.order_items}});
            this.total_cost = cartItems.reduce((total, item) => total + item.sub_total, 0);

            for (const item of cartItems) {
                const product = await Product.findById(item.product_id);
                if (product){
                    if (item.quantities > product.stock){
                        return next(new Error(`Product "${product.product_name}" is out of stock`));
                    }
                }
            }
        }
        else{
            this.total_cost = 0;
        }
        next();
    }
    catch (err){
        next(err);
    }
});

// Middleware to delete cart items and update product stock after an order is saved
orderSchema.post('save', async function (doc, next){
    try {
        const cartItems = doc.order_items;
        const cartItemsPost = await CartItem.find({ _id: { $in: cartItems}})
            .populate({path: 'product_id', select: 'product_name category price selling_price discount product_images', populate: {path: 'category', select: 'category_name'}}).lean();

        // Update product stock after an order is saved
        for (const item of doc.order_items){
            const cartItem = await CartItem.findById(item);
            const product = await Product.findById(cartItem?.product_id);

            if (product){
                product.stock -= cartItem.quantities;
                product.sold += cartItem.quantities;
                await Product.findByIdAndUpdate(cartItem?.product_id, {$set: {stock: product.stock, sold: product.sold}});
            }
        }

        // Delete the cart items after an order is saved
        await CartItem.deleteMany({ _id: { $in: doc.order_items}});

        // Update the order with the order_items_post
        await this.model('Order').findByIdAndUpdate(doc._id, {$set: {order_items: [], status: 'Paid', order_items_post: cartItemsPost}}, {new: true});

        next();
    }
    catch (err) {
        next(err);
        console.trace(err);
    }
});


module.exports = mongoose.model('Order', orderSchema);