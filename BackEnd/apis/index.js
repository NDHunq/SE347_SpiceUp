const registerEndPoint = require('./register')
const productEndPoint = require('../routes/productRoute')

function api(app) {


    app.use('/register',registerEndPoint)
    app.use('/api/v1/product',productEndPoint);
}

module.exports = api