const express = require('express')
const morgan = require('morgan')
const api = require('./apis/index')
const app = express()
const port = 3000

app.use(morgan('combined'))

api(app)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})