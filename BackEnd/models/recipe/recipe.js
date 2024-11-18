const mongoose = require('mongoose')
//console.log(orderId)
mongoose.set('debug', true)

const RecipeStep = require("./recipeStep")
const SpiceUp = mongoose.connection.useDb('SpiceUp');



const RecipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cookingTimeInSecond: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    status: {
        type: String,
        require: true,
        default: 'RS1'
    },
    views: {
        type: Number,
        require: true
    },
    tag: [{
        type: String,
    }],
    ingredients: [{
        name: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        link: {
            type: String
        }
    }],
    step: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: RecipeStep,
        require: true
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Recipe = SpiceUp.model('Recipe', RecipeSchema)

module.exports = Recipe








