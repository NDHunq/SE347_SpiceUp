const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth/auth');

//import the controller
const {createCartItem, getCartItemByID, getAllUserItems, getAllCartItems, deleteCartItem, updateCartItem} = require('../controllers/CartItemController');

//Get all items
router.get('', authenticate,  getAllCartItems);

//Get an item by ID
router.get('/id/:id', authenticate, getCartItemByID);

//Get all user's items
router.get('/user/:id', authenticate,  getAllUserItems);

//Create an item
router.post('', authenticate,  createCartItem);

//Delete an item
router.delete('/:id', authenticate, deleteCartItem);

//Update an item
router.patch('/:id', authenticate, updateCartItem);

module.exports = router;