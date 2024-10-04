const Product = require('../Models/Product');
const mongoose = require('mongoose');

// // Get all products
// const getAllProducts = async (req, res) => {
//     try{
//         const products = await Product.find({}).sort({createdAt: -1});
//         res.status(200).json(products);
//     }
//     catch (err) {
//         res.status(400).json({Error: err.message});
//         console.log(err);
//     }
// };
//
// // Get all products with pagination
// const getAllProductsWithPagination = async (req, res) => {
//     try {
//         const page = req.query.page * 1 || 1;
//         const limit = req.query.limit * 1 || 10;
//         const skip = (page - 1) * limit;
//
//         const products = await Product.find({}).sort({createdAt: -1}).skip(skip).limit(limit);
//
//         const total_products = await Product.countDocuments();
//         res.status(200).json(
//             {
//                 page,
//                 limit,
//                 total_products,
//                 total_pages: Math.ceil(total_products / limit),
//                 products
//             });
//     }
//     catch (err) {
//         res.status(400).json({Error: err.message});
//         console.log(err);
//     }
// }

// Get a product by ID
const getProductByID = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Product not found'});
    }

    try{
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//CREATE a product
const createProduct = async (req, res) => {
    const {product_name, category, price, stock, discount, averageRatings, productStatus, brand, description, product_images} = req.body;
    try{
        const newProduct = await Product.create({product_name, category, price, stock, discount, averageRatings, productStatus, brand, description, product_images});
        res.status(200).json(newProduct);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

//UPDATE a product
const updateProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Product not found'});
    }

    const product = await Product.findOneAndUpdate({_id: id}, {...req.body});

    if(!product) {
        return res.status(404).json({Error: 'Product not found'});
    }

    res.status(200).json(product);
}

//DELETE a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({Error: 'Product not found'});
    }
    try {
        const product = await Product.findOneAndDelete({_id: id});
        res.status(200).json(product);
    }
    catch(err) {
        res.status(400).json({Error: err.message});
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
                page,
                limit,
                product_counts,
                total_products,
                total_pages: Math.ceil(product_counts / limit),
                products
            });    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
}

module.exports = {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct, getProductByName };