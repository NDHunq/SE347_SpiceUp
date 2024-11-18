const registerEndPoint = require('./register')
const productEndPoint = require('../routes/productRoute')
const categoryEndPoint = require('../routes/categoryRoute');
const cartItemEndPoint = require('../routes/cartItemRoute');
const orderEndPoint = require('../routes/orderRoute');
const reviewEndPoint = require('../routes/reviewRoute');

const imageEndPoint = require('../routes/imageRoute');
const loginEndPoint = require('./login')
const userEndPoint = require('./user')
//const orderEndPoint = require('./order')
const recipeEndPoint = require('./recipe')
const adminEndPoint = require('./admin')

function api(app) {
    app.use('/api/v1/product',productEndPoint);
    app.use('/api/v1/category',categoryEndPoint);
    app.use('/api/v1/cartItem',cartItemEndPoint);
    app.use('/api/v1/order',orderEndPoint);
    app.use('/api/v1/review',reviewEndPoint);
    
    app.use('/api/v1/image',imageEndPoint);

    app.post('/api/v1/register', registerEndPoint)
    
    app.use('/api/v1/login', loginEndPoint)
    //app.get('/api/v1/login', loginEndPoint)


    app.use('/api/v1/user', userEndPoint)

    app.use('/api/v1/recipe', recipeEndPoint)

    app.use('/api/v1/admin', adminEndPoint)
}

module.exports = api