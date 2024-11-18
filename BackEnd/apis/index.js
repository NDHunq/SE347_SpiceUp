const registerEndPoint = require('./register')
const productEndPoint = require('../routes/productRoute')
const categoryEndPoint = require('../routes/categoryRoute');
const cartItemEndPoint = require('../routes/cartItemRoute');
const orderEndPoint = require('../routes/orderRoute');
const reviewEndPoint = require('../routes/reviewRoute');
//const userEndPoint = require('../routes/userRoute');
const billingAddressEndPoint = require('../routes/billingAddressRoute');
const imageEndPoint = require('../routes/imageRoute');
const loginEndPoint = require('./login')
const userEndPoint = require('./user')
//const orderEndPoint = require('./order')

function api(app) {
    app.use('/register',registerEndPoint)
    app.use('/api/v1/product',productEndPoint);
    app.use('/api/v1/category',categoryEndPoint);
    app.use('/api/v1/cartItem',cartItemEndPoint);
    app.use('/api/v1/order',orderEndPoint);
    app.use('/api/v1/review',reviewEndPoint);
    //app.use('/api/v1/user',userEndPoint);
    app.use('/api/v1/billingAddress',billingAddressEndPoint);
    app.use('/api/v1/image',imageEndPoint);

    app.post('/register', registerEndPoint)
    app.post('/login', loginEndPoint)
    app.get('/login', loginEndPoint)


    app.use('/user', userEndPoint)

    //app.use('/order', orderEndPoint)
}

module.exports = api