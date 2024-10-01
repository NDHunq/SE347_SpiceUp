const mongoose = require('mongoose')
//console.log(orderId)
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');



const OrderSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    date: {
        type: Date,
        require: true,
    },
    totalCost: {
        type: Number,
        require: true,
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    shippingFee: {
        type: Number,
        require: true,
    },
    productItemId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }
})

const Order = SpiceUp.model('Order', OrderSchema)

module.exports = Order








