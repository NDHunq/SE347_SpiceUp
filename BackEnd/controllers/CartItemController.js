const CartItem = require('../models/CartItem');
const mongoose = require('mongoose');

//GET all cart items
const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find({}).sort({createdAt: -1}).populate({path: 'product_id', select: 'product_name price stock product_images', populate: {path: 'category', select: 'category_name'}});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Cart items retrieved successfully',
                data: {
                    cartItems,
                    total: cartItems.length
                },
                errors: null
            }
        );
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
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Item not found',
                data: null,
                errors: 'Invalid item_id'
            }
        );
    }

    try {
        const cartItem = await CartItem.findById(id).populate({path: 'product_id', select: 'product_name price stock product_images', populate: {path: 'category', select: 'category_name'}});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Cart item retrieved successfully',
                data: cartItem,
                errors: null
            }
        );
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//Get all user's items
const getAllUserItems = async (req, res) => {
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
        const cartItems = await CartItem.find({user_id: id}).sort({createdAt: -1}).populate({path: 'product_id', select: 'product_name price stock product_images', populate: {path: 'category', select: 'category_name'}});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Cart items retrieved successfully',
                data: {
                    cartItems,
                    total: cartItems.length
                },
                errors: null
            }
        );
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//Create an item
const createCartItem = async (req, res) => {
    const { user_id, product_id, quantities } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id) || !user_id) {
        return res.status(404).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid user_id',
                data: null,
                errors: 'Bad request'
            }
        );
    }

    if (!mongoose.Types.ObjectId.isValid(product_id) || !product_id) {
        return res.status(404).json(
            {
                status: 'error',
                code: 400,
                message: 'invalid product_id',
                data: null,
                errors: 'Bad request'
            }
        );
    }

    if (!quantities || quantities <= 0) {
        return res.status(404).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid quantity',
                data: null,
                errors: 'Bad request'
            }
        );
    }

    try {
        const cartItemExist = await CartItem.findOne({user_id, product_id});

        if (cartItemExist) {
            cartItemExist.quantities += quantities;
            await cartItemExist.save();
            return res.status(200).json(
                {
                    status: 'success',
                    code: 200,
                    message: 'Cart item update successfully',
                    data: cartItemExist,
                    errors: null
                }
            );
        }
        else {
            const cartItem = new CartItem({user_id, product_id, quantities});
            await cartItem.save();
            return res.status(201).json(
                {
                    status: 'success',
                    code: 201,
                    message: 'Cart item created successfully',
                    data: cartItem,
                    errors: null
                }
            );
        }
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

//DELETE an item
const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Cart item not found',
                data: null,
                errors: 'Invalid cart_item_id'
            }
        );
    }
    try {
        const cartItem = await CartItem.findOneAndDelete({_id: id});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Cart item deleted successfully',
                data: cartItem,
                errors: null
            }
        );
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

// //DELETE all user's items
// const deleteALlUserItems = async (req, res) => {
//
// };

//UPDATE an item
const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantities } = req.body;

    if (!quantities || quantities <= 0) {
        return res.status(404).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid quantity',
                data: null,
                errors: 'Bad request'
            }
        );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Item not found',
                data: null,
                errors: 'Invalid item_id'
            }
        );
    }

    const cartItem = await CartItem.findById(id);
    if (cartItem) {
        Object.assign(cartItem, req.body);
        await cartItem.save();
    }
    else{
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Item not found',
                data: null,
                errors: 'Item not found'
            }
        );
    }

    res.status(200).json(
        {
            status: 'success',
            code: 200,
            message: 'Cart item updated successfully',
            data: cartItem,
            errors: null
        }
    );
};

module.exports = {createCartItem, getCartItemByID, getAllUserItems, getAllCartItems, deleteCartItem, updateCartItem};