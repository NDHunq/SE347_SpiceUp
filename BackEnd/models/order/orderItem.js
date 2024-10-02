const mongoose = require('mongoose')
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');

const OrderItemSchema = new mongoose.Schema({
    quantity: [{
        type: Number,
        require: true
    }],
    productId : [{
        type: Number,
        ref: 'Product',
        require: true
    }],
    reviewId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})


const OrderItem = SpiceUp.model('OrderItemSchema', OrderItemSchema)

module.exports = OrderItem








