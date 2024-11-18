const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./Product');
const reviewSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    review_image: [{
        type: String,
        required: false,
        default: ''
    }]
});
reviewSchema.post('save', async function (doc, next){
    try {
        const product = await Product.findById(doc.product_id);
        if (!product) {
            return next(new Error('Product not found'));
        }
        product.review_count += 1;
        product.average_ratings = (product.average_ratings + doc.rating) / product.review_count;
        await Product.findByIdAndUpdate(
            doc.product_id,
            {
                $set: { ...product }
            }, {new: true});
        next();
    }
    catch (err) {
        next(err);
        console.log(err);
    }
});
module.exports = mongoose.model('Review', reviewSchema);