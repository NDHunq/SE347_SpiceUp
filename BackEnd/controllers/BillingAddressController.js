const mongoose = require('mongoose');
const BillingAddress = require('../models/BillingAddress');

// Get billing address by user_id
const getUserBillingAddress = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'User not found',
                data: null,
                errors: 'Invalid user_id'
            }
        );
    }

    try {
        const billingAddress = await BillingAddress.find({user_id: id});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Billing address retrieved successfully',
                data: billingAddress,
                errors: null
            });
    }
    catch (err) {
        res.status(500).json(
            {
                status: 'error',
                code: 500,
                message: 'Internal server error',
                data: null,
                errors: err.message
            }
        );
        console.log(err);
    }
}

// Update billing address by user_id
const updateBillingAddress = async (req, res) => {
    const { user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'User not found',
                data: null,
                errors: 'Invalid user_id'
            }
        );
    }

    try {
        const billingAddress = await BillingAddress.find({user_id: user_id});

        if (billingAddress) {
            Object.assign(billingAddress, req.body);
            await billingAddress.save();
        }
        else {
            return res.status(404).json(
                {
                    status: 'error',
                    code: 404,
                    message: 'Billing address not found',
                    data: null,
                    errors: 'Invalid billing address'
                }
            );
        }

        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Billing address updated successfully',
                data: billingAddress,
                errors: null
            }
        );
    }
    catch (err) {
        res.status(500).json(
            {
                status: 'error',
                code: 500,
                message: 'Internal server error',
                data: null,
                errors: err.message
            }
        );
        console.log(err);
    }
}

module.exports = { getUserBillingAddress, updateBillingAddress };