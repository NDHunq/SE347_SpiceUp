const express = require('express');
const router = express.Router();

//import the controller
const {createOrder, getAllOrdersByUserID, updateOrder, getOrderById} = require('../controllers/OrderController.js');

// Get all orders by user_id
router.get('', getAllOrdersByUserID);

// Create an order
router.post('', createOrder);

// Update an order
router.patch('/:id', updateOrder);

// Get an order by ID
router.get('/:id', getOrderById);

module.exports = router;