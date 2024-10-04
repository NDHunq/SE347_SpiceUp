const Order = require('../Models/Order');
const mongoose = require('mongoose');

//Get all orders by user_id with pagination
const getAllOrdersByUserID = async (req, res) => {
    const { user_id } = req.query;
    try
    {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = ( page - 1 ) * limit;

        const orders = await Order.find({user_id: user_id}).sort({date_ordered: 'desc'}).skip(skip).limit(limit).populate({path: 'order_items', select: 'quantities subTotal', populate: {path: 'product_id', select: 'product_name price stock', populate: {path: 'category', select: 'category_name'}}});

        const order_counts = orders.length;
        const total_orders = await Order.countDocuments({user_id: user_id});

        res.status(200).json(
            {
                page,
                limit,
                order_counts,
                total_orders,
                total_pages: Math.ceil(order_counts / limit),
                orders
            });
    }
    catch (err){
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

// Create a new order
const createOrder = async (req, res) => {
    const { user_id, date_ordered, order_items, total_cost, payment_method, status } = req.body;
    try {
        const order = await Order.create({user_id, date_ordered, order_items, total_cost, payment_method, status});
        res.status(200).json(order);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

// Update an order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = Order.findById(id);
        if(order) {
            Object.assign(order, req.body);
            await order.save();
        }
        else{
            res.status(404).json({Error: 'Order not found'});
        }

        res.status(200).json({Message: 'Order updated successfully'});
    }
    catch (err){
        res.json(400).message({Error: err.message});
        console.log(err);
    }
}

module.exports = {createOrder, getAllOrdersByUserID, updateOrder};