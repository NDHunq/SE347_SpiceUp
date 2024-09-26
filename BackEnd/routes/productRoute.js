const express = require('express');
const router = express.Router();

//import controllers
const {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct} = require('../controllers/productController');

//GET all products
router.get('/',getAllProducts);

//GET a product by ID
router.get('/:id', getProductByID);

//CREATE a product
router.post('/', createProduct);

//DELETE a product
router.delete('/:id', deleteProduct);

//UPDATE a product
router.patch('/:id', updateProduct);

module.exports = router;