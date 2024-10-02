const mongoose = require('mongoose')
//console.log(orderId)
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');

const ReviewSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    content: {
        type: String,
        require: true,
    },
    star: {
        type: Number,
        require: true,
    },
    productId: {
        type: Number,
        ref: 'Product',
        require: true,
    },
    image: {
        type: String,
        require: true,
    }
})

const Review = SpiceUp.model('Review', ReviewSchema)

module.exports = Review








