const registerEndPoint = require('./register')


function api(app) {


    app.use('/register',registerEndPoint)

}

module.exports = api