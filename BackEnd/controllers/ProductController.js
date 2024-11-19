const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get a product by ID
const getProductByID = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Product not found',
                data: null,
                errors: 'Invalid product_id'
            }
        );
    }

    try{
        const product = await Product.findById(id);
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Product retrieved successfully',
                data: product,
                errors: null
            }
        );
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//CREATE a product
const createProduct = async (req, res) => {
    const {product_name, category, price, stock, discount, brand, description, product_images} = req.body;
    const productStatus = 'active';
    const averageRatings = 0;

    if (!product_name || !category || !price || !stock || !discount || !brand || !description || !product_images) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Missing required fields',
                data: null,
                errors: 'Bad request'
            }
        );
    }
    try{
        const newProduct = await Product.create({product_name, category, price, stock, discount, averageRatings, productStatus, brand, description, product_images});
        res.status(201).json(
            {
                status: 'success',
                code: 201,
                message: 'Product created successfully',
                data: newProduct,
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

//UPDATE a product
const updateProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Product not found',
                data: null,
                errors: 'Invalid product_id'
            }
        );
    }

    try {
        const product = await Product.findOneAndUpdate({_id: id}, {...req.body}, {new: true});

        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Product updated successfully',
                data: product,
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

//DELETE a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(
            {
                status: 'error',
                code: 404,
                message: 'Product not found',
                data: null,
                errors: 'Invalid product_id'
            }
        );
    }
    try {
        const product = await Product.findOneAndDelete({_id: id});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Product deleted successfully',
                data: product,
                errors: null
            }
        );
    }
    catch(err) {
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

//GET a product(s) by name
const getProductByName = async (req, res) => {
    console.log(req.params.product_name)
    const product_name = decodeURIComponent(req.params.product_name);
    console.log(product_name);
    try {
        const products = await Product.find({product_name: {$regex: product_name, $options: 'i'}});

        if (!products || products.length <= 0){
            return res.status(404).json({Error: 'Product not found'});
        }

        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

// Get all products with pagination, sorting and filtering
const getAllProducts = async (req, res) => {
    const { category, price, rating } = req.query;

    const sort = req.query.sort || 'desc';

    // Create a filter object
    let filter = {};

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    try {
        if (category) {
            // Split the category into an array of objectIds
            const categories = category.split(',').map(id => new mongoose.Types.ObjectId(id.trim()));

            // Get filter for category
            filter.category = { $in: categories };
        }

        if (price) {
            filter.price = {};
            // Split the price into an array of prices
            const prices = price.split(',');

            // Get filter for price: price[0] is the minimum price and price[1] is the maximum price
            filter.price.$gte = prices[0];
            filter.price.$lte = prices[1];
        }

        if (rating) {
            filter.average_ratings = {};
            filter.average_ratings.$gte = rating;
            filter.average_ratings.$lte = 5;
        }

        const products = await Product.find(filter).sort({created_at: sort}).skip(skip).limit(limit);

        const product_counts = products.length;

        const total_products = await Product.countDocuments();

        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Products retrieved successfully',
                data: {
                    products,
                    total: total_products
                },
                errors: null,
                // page,
                // limit,
                // product_counts,
                // total_products,
                // total_pages: Math.ceil(product_counts / limit),
            });
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

const findProductsWithFilter = async (req, res) => {
    // filter = {
    //   sort: {
    //      field: 'created_at', [created_at, price, average_ratings, discount]
    //      order: 'desc' [asc, desc]
    //   } || null,
    //   category: ['id1', 'id2'] || null,
    //   price: [1000, 5000] || null,
    //   average_ratings: 4 || null,
    //   product_name: 'Samsung' || null}

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const { sort, category, price, average_ratings, product_name } = req.body;
    let filter = {};

    const sortField = sort?.field || 'created_at';
    const sortOrder = sort?.order || 'desc';

    if (category) {
        filter.category = { $in: category };
    }

    if (price && price.length === 2) {
        filter.price = {};
        filter.price.$gte = price[0];
        filter.price.$lte = price[1];
    }

    if (average_ratings) {
        filter.average_ratings = average_ratings;
    }

    if (product_name) {
        filter.product_name = { $regex: product_name, $options: 'i' };
    }

    //console.log(sortField, sortOrder, filter);

    try {
        const products = await Product.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit);
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Products retrieved successfully',
                data: {
                    products,
                    total: products?.length
                },
                errors: null
            }
        )
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

module.exports = {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct, getProductByName, findProductsWithFilter };