const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
mongoose.set('debug', true)

const SpiceUp = mongoose.connection.useDb('SpiceUp');
const { v4: uuidv4 } = require('uuid');

const billingAddressSchema = new mongoose.Schema({
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
        require: false,
    },
    country: {
        type: String,
        require: false,
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
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    }
});

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
        unique: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    billingAddress: {
        type: billingAddressSchema,
        default: null
    },
    role: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
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



const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User








