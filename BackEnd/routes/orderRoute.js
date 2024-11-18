const express = require('express');
const router = express.Router();

//import the controller
const {createOrder, getAllOrdersByUserID, updateOrder, getOrderById} = require('../controllers/OrderController.js');
const authenticate = require("../middlewares/auth/auth");

// Get all orders by user_id
router.get('', authenticate, getAllOrdersByUserID);

// Create an order
router.post('', authenticate, createOrder);

// Update an order
router.patch('/:id', authenticate, updateOrder);

// Get an order by ID
router.get('/:id', authenticate, getOrderById);

module.exports = router;