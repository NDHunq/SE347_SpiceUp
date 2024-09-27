const registerEndPoint = require('./register')
const productEndPoint = require('../routes/productRoute')
const categoryEndPoint = require('../routes/categoryRoute');

function api(app) {


    app.use('/register',registerEndPoint)
    app.use('/api/v1/product',productEndPoint);
    app.use('/api/v1/category',categoryEndPoint);
}

module.exports = api