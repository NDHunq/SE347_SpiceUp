const registerEndPoint = require('./register')
const productEndPoint = require('../routes/productRoute')
const categoryEndPoint = require('../routes/categoryRoute');
const cartItemEndPoint = require('../routes/cartItemRoute');
const orderEndPoint = require('../routes/orderRoute');
const reviewEndPoint = require('../routes/reviewRoute');

function api(app) {
    app.use('/register',registerEndPoint)
    app.use('/api/v1/product',productEndPoint);
    app.use('/api/v1/category',categoryEndPoint);
    app.use('/api/v1/cartItem',cartItemEndPoint);
    app.use('/api/v1/order',orderEndPoint);
    app.use('/api/v1/review',reviewEndPoint);
}

module.exports = api