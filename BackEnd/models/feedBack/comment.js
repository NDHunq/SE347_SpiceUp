const mongoose = require('mongoose')
const Feedback = require('./feedBack')

//console.log(orderId)
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');

const CommentSchema = new mongoose.Schema({ 
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        require: true,
    }
})

const Comment = Feedback.discriminator('Comment', CommentSchema)

module.exports = Comment








