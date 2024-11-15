const registerEndPoint = require('./register')
const loginEndPoint = require('./login')
const userEndPoint = require('./user')
const recipeEndPoint = require('./recipe')
const adminEndPoint = require('./admin')

function api(app) {

    app.post('/api/v1/register', registerEndPoint)
    
    app.post('/api/v1/login', loginEndPoint)
    app.get('/api/v1/login', loginEndPoint)


    app.use('/api/v1/user', userEndPoint)

    app.use('/api/v1/recipe', recipeEndPoint)

    app.use('/api/v1/admin', adminEndPoint)
}

module.exports = api