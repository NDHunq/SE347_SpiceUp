const mongoose = require('mongoose');
const Review = require('../models/Review');

//Get all reviews about a specific product
const getReviewsByProductId = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.find({ product_id: id}).sort({createdAt: -1});
        res.status(200).json(reviews);
    }
    catch (err) {
        res.status(400).json({ Error: err.message });
        console.log(err);
    }
}

//Get user review about a specific product
const getUserReview = async (req, res) => {
    const { user_id, product_id } = req.query;
    if (user_id && product_id && mongoose.Types.ObjectId.isValid(user_id) && mongoose.Types.ObjectId.isValid(product_id)) {
        try {
            const review = await Review.findOne({ user_id: user_id, product_id: product_id });
            res.status(200).json(review);
        }
        catch (err) {
            res.status(400).json({ Error: err.message });
            console.log(err);
        }
    }
}

//Create a new review from order history
const createReview = async (req, res) => {
    const { user_id, product_id, content, rating, review_image } = req.body;
    try {
        const review = await Review.create({ user_id, product_id, content, rating, review_image });
        res.status(200).json(review);
    }
    catch (err) {
        res.status(400).json({ Error: err.message });
        console.log(err);
    }
}

module.exports = { getReviewsByProductId, getUserReview, createReview };