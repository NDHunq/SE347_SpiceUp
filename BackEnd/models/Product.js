const mongoose = require('mongoose');
const Category = require('./Category');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    average_ratings: {
        type: Number,
        required: true,
        default: 0
    },
    review_count: {
        type: Number,
        required: true,
        default: 0
    },
    product_status: {
        type: String,
        required: true,
        default: 'In Stock'
    },
    brand: {
        type: String,
        required: true,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    //Array of images URL
    product_images: [{
        type: String,
        required: false,
        default: ''
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
},);

// Middleware to update product count in category after a product is created
productSchema.post('save', async function (doc, next){
    try {
        const category_id = doc.category;
        await Category.findByIdAndUpdate(category_id, {$inc: {product_count: 1}});

        next();
    }
    catch (err){
        next(err);
    }
});

// Middleware to update product count in category after a product is deleted
productSchema.post('findOneAndDelete', async function (result, next) {
    try {
        if (result) {
            // Nếu tài liệu bị xóa tồn tại
            const category_id = result.category;
            await Category.findByIdAndUpdate(category_id, { $inc: { product_count: -1 } });
        }
        next();
    } catch (err) {
        next(err);
    }
});

productSchema.post('findOneAndUpdate', async function (result, next) {
    try {
        if (result && result.stock === 0) {
            result.product_status = "Out of Stock";
            await result.updateOne({product_status: "Out of Stock"});
        }
        else if (result && result.stock > 0 && result.product_status === "Out of Stock") {
            result.product_status = "In Stock";
            await result.updateOne({product_status: "In Stock"});
        }
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

