const express = require('express');
const Router = express.Router();

// Importing the Controller
const { getReviewsByProductId, getUserReview, createReview} = require('../controllers/ReviewController');
const authenticate = require("../middlewares/auth/auth");

// Get all reviews about a specific product
Router.get('/:product_id', authenticate, getReviewsByProductId);

// Get user review about a specific product
Router.get('', authenticate, getUserReview);

// Create a new review
Router.post('', authenticate, createReview);

module.exports = Router;