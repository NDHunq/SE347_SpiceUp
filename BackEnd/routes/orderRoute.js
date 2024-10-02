const express = require('express');
const router = express.Router();

//import the controller
const {createOrder, getAllOrdersByUserID, updateOrder} = require('../controllers/OrderController.js');

// Get all orders by user_id
router.get('/:user_id', getAllOrdersByUserID);

// Create an order
router.post('/', createOrder);

// Update an order
router.patch('/:id', updateOrder);

module.exports = router;