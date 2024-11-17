const express = require('express');
const router = express.Router();

// Importing the Controller
const { updateBillingAddress } = require('../controllers/billingAddressController');

// Update a billing address
router.patch('/:user_id', updateBillingAddress);

module.exports = router;