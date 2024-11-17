require('dotenv').config()

const mongoose = require('mongoose')

async function connectToDb() {

    const uri = process.env.DB_URI

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("successfully connected");
        return conn.connection.db;
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDb