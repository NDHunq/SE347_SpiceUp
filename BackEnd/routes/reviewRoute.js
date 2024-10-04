const express = require('express');
const Router = express.Router();

// Importing the Controller
const { getReviewsByProductId, getUserReview, createReview} = require('../controllers/ReviewController');

// Get all reviews about a specific product
Router.get('/:id', getReviewsByProductId);

// Get user review about a specific product
Router.get('/', getUserReview);

// Create a new review
Router.post('/', createReview);

module.exports = Router;