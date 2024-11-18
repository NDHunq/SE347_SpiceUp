const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

//Get all orders by user_id with pagination
const getAllOrdersByUserID = async (req, res) => {
    const { user_id } = req.query
    //const this_user_id = user_id;

    if (!mongoose.Types.ObjectId.isValid(user_id) || !user_id) {
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

    try
    {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = ( page - 1 ) * limit;

        const orders = await Order.find({user_id: user_id})
            .sort({date_ordered: 'desc'})
            .skip(skip)
            .limit(limit)
            .populate({path: 'order_items', select: 'quantities sub_total', populate: {path: 'product_id', select: 'product_name price stock', populate: {path: 'category', select: 'category_name'}}})
            .populate({path: 'user_id', select: 'billingAddress'});

        //const order_counts = orders.length;
        const total_orders = await Order.countDocuments({user_id: user_id});

        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Orders retrieved successfully',
                data: {
                    orders,
                    total: total_orders
                },
                errors: null
            });
    }
    catch (err){
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

// Create a new order
const createOrder = async (req, res) => {
    const { user_id, order_items, total_cost, payment_method } = req.body;
    let { order_notes } = req.body;
    const date_ordered = Date.now();

    if (!order_notes) {
        order_notes = '';
    }

    if (!user_id || !order_items || !payment_method || !total_cost) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Missing required fields',
                data: null,
                errors: 'Missing required fields'
            }
        );
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid user_id',
                data: null,
                errors: 'Invalid user_id'
            }
        );
    }

    try {
        const order = await Order.create({user_id, date_ordered, order_items, total_cost, payment_method, order_notes});
        res.status(201).json(
            {
                status: 'success',
                code: 201,
                message: 'Order created successfully',
                data: order,
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

// Update an order
const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
        return res.status(404).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid order_id',
                data: null,
                errors: 'Invalid order_id'
            }
        );
    }
    try {
        const order = await Order.findById(id);
        console.log(order);

        if(order) {
            Object.assign(order, req.body);
            console.log(order);
            await order.save();
        }
        else{
            res.status(404).json(
                {
                    status: 'error',
                    code: 404,
                    message: 'Order not found',
                    data: null,
                    errors: 'Order not found'
                }
            );
        }


        res.status(200).json(order);
    }
    catch (err){
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

const getOrderById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
        return res.status(404).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid order_id',
                data: null,
                errors: 'Invalid order_id'
            }
        );
    }
    try {
        const order = await Order.findById(id).populate({path: 'user_id', select: 'billingAddress'});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Order retrieved successfully',
                data: order,
                errors: null
            }
        );
    }
    catch (err){
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

module.exports = {createOrder, getAllOrdersByUserID, updateOrder, getOrderById};