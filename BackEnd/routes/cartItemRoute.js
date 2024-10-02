const express = require('express');
const router = express.Router();

//import the controller
const {createCartItem, getCartItemByID, getAllCartItems, deleteCartItem, updateCartItem} = require('../controllers/CartItemController');

//Get all items
router.get('/', getAllCartItems);

//Get an item by ID
router.get('/:id', getCartItemByID);

//Create an item
router.post('/', createCartItem);

//Delete an item
router.delete('/:id', deleteCartItem);

//Update an item
router.patch('/:id', updateCartItem);

module.exports = router;