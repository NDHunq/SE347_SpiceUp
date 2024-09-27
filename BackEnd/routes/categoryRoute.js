const express = require('express');
const router = express.Router();

//import controllers
const {getAllCategories, getCategoryByID, createCategory} = require('../controllers/CategoryController.js');

//GET all categories
router.get('/', getAllCategories);

//GET a category by ID
router.get('/:id', getCategoryByID);

//CREATE a category
router.post('/', createCategory);

module.exports = router;