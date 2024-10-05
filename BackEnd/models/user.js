const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const { billingAddressSchema } = require('./billingAddress')

const UserSchema = new mongoose.Schema({
    id : {
        type: String,
        default: uuidv4
    },

    email : {
        type: String,
        require: true,
        unique: true 
    },
    password : {
        type: String,
        require: true,
        unique: true 
    },
    phone : {
        type: String,
        require: true,
        unique: true 
    },
    firstname : {
        type: String,
        require: true,
        default: ''
    },
    lastname : {
        type: String,
        require: true,
        default: ''
    },
    billingAddress : billingAddressSchema,
    role : {
        type: String,
        require: true,
    },
    avatar : {
        type: String,
        require: true,
        unique: true 
    }
})

UserSchema.pre('save', async function () {
    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt); 
    } catch (error) {
        return error;
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User








