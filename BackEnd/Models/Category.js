const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the category collection
const categorySchema = new Schema({
    category_id : {
        type: String,
        required: true,
        unique: true
    },
    category_name: {
        type: String,
        required: true
    },
    product_number: {
        type: Number,
        required: true,
        default: 0
    }
});
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
module.exports = {Category, categorySchema};
