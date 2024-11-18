const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the category collection
const categorySchema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    product_count: {
        type: Number,
        required: true,
        default: 0
    }
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
module.exports = Category;
