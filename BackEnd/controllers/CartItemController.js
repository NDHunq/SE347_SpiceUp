const CartItem = require('../Models/CartItem');
const mongoose = require('mongoose');

//GET all cart items
const getAllCartItems = async (req, res) => {
    try {
        const cartItem = await CartItem.find({}).sort({createdAt: -1}).populate({path: 'product_id', select: 'product_name price stock product_images', populate: {path: 'category', select: 'category_name'}});
        res.status(200).json(cartItem);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//GET an item by ID
const getCartItemByID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Item not found'});
    }
    try {
        const cartItem = await CartItem.findById(id).populate({path: 'product_id', select: 'product_name price stock product_images', populate: {path: 'category', select: 'category_name'}});
        res.status(200).json(cartItem);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//Get all user's items
const getAllUserItems = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await CartItem.find({user_id: id}).sort({createdAt: -1}).populate({path: 'product_id', select: 'product_name price stock product_images', populate: {path: 'category', select: 'category_name'}});
        res.status(200).json(cartItem);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//Create an item
const createCartItem = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const cartItem = new CartItem({user_id, product_id});
        await cartItem.save();
        res.status(200).json(cartItem);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//DELETE an item
const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Item not found'});
    }
    try {
        const cartItem = await CartItem.findOneAndDelete({_id: id});
        res.status(200).json(cartItem);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//DELETE all user's items
const deleteALlUserItems = async (req, res) => {

};

//UPDATE an item
const updateCartItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Item not found'});
    }

    const cartItem = await CartItem.findById(id);
    if (cartItem) {
        Object.assign(cartItem, req.body);
        await cartItem.save();
    }
    else{
        return res.status(404).json({Error: 'Item not found'});
    }

    res.status(200).json(cartItem);
};

module.exports = {createCartItem, getCartItemByID, getAllUserItems, getAllCartItems, deleteCartItem, updateCartItem};