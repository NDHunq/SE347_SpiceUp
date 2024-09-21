const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('combined'))

app.get('/home',(req,res) => {

    console.log(req.headers)
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})