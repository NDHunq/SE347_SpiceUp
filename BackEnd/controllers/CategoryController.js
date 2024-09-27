const Category = require('../models/Category');
const mongoose = require('mongoose');

//GET all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({createdAt: -1});
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

//GET a category by ID
const getCategoryByID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Category not found'});
    }

    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    }
    catch (err){
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

//CREATE a category
const createCategory = async (req, res) => {
    const { category_name, product_count } = req.body;

    try {
        const category = await Category.create({category_name, product_count});
        res.status(200).json(category);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

module.exports = {getAllCategories, getCategoryByID, createCategory};