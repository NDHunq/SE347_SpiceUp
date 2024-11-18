const express = require('express');
const router = express.Router();

//import controllers
const {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct, getProductByName, findProductsWithFilter } = require('../controllers/productController');

// Get all products with pagination, sorting and filtering
router.get('',getAllProducts);

// Get a product by ID
router.get('/id/:id', getProductByID);

// Create a product
router.post('', createProduct);

// Delete a product
router.delete('/:id', deleteProduct);

// Update a product
router.patch('/:id', updateProduct);

// Get a product by name
router.get('/name/:product_name', getProductByName);

// Find all products with pagination, sorting and filtering
router.post('/filter', findProductsWithFilter);

module.exports = router;