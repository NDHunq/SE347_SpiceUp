const express = require('express');
const router = express.Router();

//import controllers
const {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct, getProductByName} = require('../controllers/productController');

//GET all products
router.get('/',getAllProducts);

//GET a product by ID
router.get('/id/:id', getProductByID);

//CREATE a product
router.post('/', createProduct);

//DELETE a product
router.delete('/:id', deleteProduct);

//UPDATE a product
router.patch('/:id', updateProduct);

//GET a product by name
router.get('/name/:product_name', getProductByName);

module.exports = router;