const mongoose = require('mongoose')
const Feedback = require('./feedBack')

//console.log(orderId)
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');

const ReviewSchema = new mongoose.Schema({ 
    star: {
        type: Number,
        require: true,
    },
    productId: {
        type: Number,
        ref: 'Product',
        require: true,
    }
})

const Review = Feedback.discriminator('Review', ReviewSchema)

module.exports = Review








