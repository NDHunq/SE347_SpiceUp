const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');
const { v4: uuidv4 } = require('uuid');


const UserSchema = new mongoose.Schema({
    // id : {
    //     type: String,
    //     default: uuidv4
    // },

    email : {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    firstname: {
        type: String,
        require: true,
        default: ''
    },
    lastname: {
        type: String,
        require: true,
    },
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    billingAddress: {
        type: {
            firstName: {
                type: String,
                require: true,
            },
            lastName: {
                type: String,
                require: true,
            },
            companyName: {
                type: String,
                require: true,
            },
            country: {
                type: String,
                require: true,
            },
            province: {
                type: String,
                require: true,
            },
            district: {
                type: String,
                require: true,
            },
            commune: {
                type: String,
                require: true,
            },
            detailAddress: {
                type: String,
                require: true,
            }
        },
        require: false
    },
    role: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date
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



const User = SpiceUp.model('User', UserSchema)

module.exports = User








