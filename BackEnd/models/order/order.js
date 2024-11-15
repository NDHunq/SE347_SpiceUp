const mongoose = require('mongoose')
//console.log(orderId)
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');



const OrderSchema = new mongoose.Schema({
    date_ordered: {
        type: Date,
        require: true,
    },
    total_cost: {
        type: Number,
        require: true,
    }
})

const Order = SpiceUp.model('Order', OrderSchema)

module.exports = Order








