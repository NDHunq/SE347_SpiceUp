const mongoose = require('mongoose');
const User = require('../models/user');

// Update a user information
const updateUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'User not found'});
    }

    try {
        const user = await User.findByIdAndUpdate(id, {...req.body}, {new: true});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: "desc"});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

module.exports = { updateUser, getAllUsers };