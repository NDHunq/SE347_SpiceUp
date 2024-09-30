const registerEndPoint = require('./register')
const loginEndPoint = require('./login')


function api(app) {

    app.post('/register',registerEndPoint)
    app.post('/login', loginEndPoint)
}

module.exports = api