const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the category collection
const categorySchema = new Schema({
    category_id : {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    productNumber: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Category', categorySchema);