const registerEndPoint = require('./register')
const loginEndPoint = require('./login')
const userEndPoint = require('./user')
const orderEndPoint = require('./order')

function api(app) {

    app.post('/register', registerEndPoint)
    app.post('/login', loginEndPoint)
    app.get('/login', loginEndPoint)


    app.use('/user', userEndPoint)

    app.use('/order', orderEndPoint)
}

module.exports = api