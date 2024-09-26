const express = require('express')
const morgan = require('morgan')
const api = require('./apis/index')
const connectToDb = require('../BackEnd/config/db/db.js')
const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.json());
api(app)

// async function connect() {
//     await connectToDb()
// }

// connect()

async function Connect() {
    await connectToDb()
        .then(() => {
            app.listen(port, () => {
                console.log(`Listening on port ${port}`)
            })
        })
        .catch(err => console.log(err));
}

// Call the function to connect to the database
Connect();

//insert test data


