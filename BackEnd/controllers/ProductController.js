const Product = require('../Models/Product');
const mongoose = require('mongoose');
//GET all products
const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({}).sort({createdAt: -1});
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({Error: err.message});
        console.log(err);
    }
};

//GET a product by ID
const getProductByID = async (req, res) => {
    const { id } = req.params;

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
module.exports = {createProduct, getAllProducts, getProductByID, deleteProduct, updateProduct};