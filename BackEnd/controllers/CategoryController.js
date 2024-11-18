const Category = require('../models/Category');
const mongoose = require('mongoose');

//GET all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({createdAt: -1});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Categories retrieved successfully',
                data: categories,
                errors: null
            }
        );
    }
    catch (err) {
        res.status(500).json(
            {
                status: 'error',
                code: 500,
                message: 'Internal server error',
                data: null,
                errors: err.message
            }
        );
        console.log(err);
    }
}

//GET a category by ID
const getCategoryByID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Category not found',
                data: null,
                errors: 'Invalid category_id'
            }
        );
    }

    try {
        const category = await Category.findById(id);
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Category retrieved successfully',
                data: category,
                errors: null
            }
        );
    }
    catch (err){
        res.status(500).json(
            {
                status: 'error',
                code: 500,
                message: 'Internal server error',
                data: null,
                errors: err.message
            }
        );
        console.log(err);
    }
}

//CREATE a category
const createCategory = async (req, res) => {
    const { category_name, product_count } = req.body;

    try {
        const category = await Category.create({category_name, product_count});
        res.status(201).json(
            {
                status: 'success',
                code: 201,
                message: 'Category created successfully',
                data: category,
                errors: null
            }
        );
    }
    catch (err) {
        res.status(500).json(
            {
                status: 'error',
                code: 500,
                message: 'Internal server error',
                data: null,
                errors: err.message
            }
        );
        console.log(err);
    }
}

module.exports = {getAllCategories, getCategoryByID, createCategory};