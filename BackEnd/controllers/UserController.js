const mongoose = require('mongoose');
const User = require('../models/user');

// Update a user information
const updateUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
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
        const user = await User.findByIdAndUpdate(id, {...req.body}, {new: true});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'User updated successfully',
                data: user,
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
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: "desc"});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Users retrieved successfully',
                data: users,
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
};

module.exports = { updateUser, getAllUsers };