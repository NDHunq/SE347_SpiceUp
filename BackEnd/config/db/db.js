require('dotenv').config()

const mongoose = require('mongoose')

async function connectToDb() {

    const uri = process.env.DB_URI


    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("successfully connected")
        })
        .catch((err) => {
            console.log(err)
        })
        // .finally(async () => {
        //     // Close the connection
        //     await mongoose.disconnect();
        //     console.log('Disconnected from MongoDB');
        // });
}

async function closeDatabaseConnection() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
    }
}

module.exports = connectToDb