const mongoose = require('mongoose')
//console.log(orderId)
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');

const RecipeStepSchema = new mongoose.Schema({
    stepNumber: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: [{
        type: String,
        require: true
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const RecipeStep = SpiceUp.model('RecipeStep', RecipeStepSchema)

module.exports = RecipeStep








