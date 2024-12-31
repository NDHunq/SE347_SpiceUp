const express = require('express');
const router = express.Router();

//import controllers
const {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct, getProductByName, findProductsWithFilter } = require('../controllers/ProductController');
const authenticate = require("../middlewares/auth/auth");

// Get all products with pagination, sorting and filtering
router.get('', getAllProducts);

// Get a product by ID
router.get('/id/:id', getProductByID);

// Create a product
router.post('', authenticate, createProduct);

// Delete a product
router.delete('/:id', authenticate, deleteProduct);

// Update a product
router.patch('/:id', authenticate, updateProduct);

// Get a product by name
router.get('/name/:product_name', getProductByName);

// Find all products with pagination, sorting and filtering
router.post('/filter', findProductsWithFilter);

module.exports = router;