const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingAddressSchema = new Schema ({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    first_name: {
        type: String,
        required: true,
        default: ''
    },
    last_name: {
        type: String,
        required: true,
        default: ''
    },
    company_name: {
        type: String,
        required: false,
        default: ''
    },
    phone: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    province: {
        type: String,
        required: true,
        default: ''
    },
    district: {
        type: String,
        required: true,
        default: ''
    },
    commune: {
        type: String,
        required: true,
        default: ''
    },
    detail_address: {
        type: String,
        required: true,
        default: ''
    },
});

const BillingAddress = mongoose.models.BillingAddress || mongoose.model('BillingAddress', billingAddressSchema);
module.exports = { BillingAddress, billingAddressSchema };