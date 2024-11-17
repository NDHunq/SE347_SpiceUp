const mongoose = require('mongoose');
const Review = require('../models/Review');

//Get all reviews about a specific product
const getReviewsByProductId = async (req, res) => {
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid product_id',
                data: null,
                errors: 'Invalid product_id'
            }
        );
    }

    try {
        const reviews = await Review.find({ product_id: product_id}).sort({createdAt: -1});
        res.status(200).json(
            {
                status: 'success',
                code: 200,
                message: 'Reviews retrieved successfully',
                data: {
                    reviews,
                    total: reviews.length
                },
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

//Get user review about a specific product
const getUserReview = async (req, res) => {
    const { user_id, product_id } = req.query;
    if (user_id && product_id && mongoose.Types.ObjectId.isValid(user_id) && mongoose.Types.ObjectId.isValid(product_id)) {
        try {
            const review = await Review.findOne({ user_id: user_id, product_id: product_id });
            res.status(200).json(
                {
                    status: 'success',
                    code: 200,
                    message: 'Review retrieved successfully',
                    data: review,
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
}

//Create a new review from order history
const createReview = async (req, res) => {
    const { user_id, product_id, content, rating, review_image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id) || !user_id) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid user_id',
                data: null,
                errors: 'Invalid user_id'
            }
        );
    }

    if (!mongoose.Types.ObjectId.isValid(product_id) || !product_id) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Invalid product_id',
                data: null,
                errors: 'Invalid product_id'
            }
        );
    }

    if (!content || !rating) {
        return res.status(400).json(
            {
                status: 'error',
                code: 400,
                message: 'Please provide content and rating',
                data: null,
                errors: 'Bad request'
            }
        );
    }

    try {
        const review = await Review.create({ user_id, product_id, content, rating, review_image });
        res.status(201).json(
            {
                status: 'success',
                code: 201,
                message: 'Review created successfully',
                data: review,
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

module.exports = { getReviewsByProductId, getUserReview, createReview };