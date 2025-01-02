const express = require("express");
const morgan = require("morgan");
const api = require("./apis/index");
const connectToDb = require("../BackEnd/config/db/db.js");
const { initGridFS } = require("../BackEnd/config/gridfs/gridfs.js");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
api(app);

// app.get('/home',(req,res) => {
//
//     console.log(req.headers)
//     res.send('Hello world')
// })
const port = process.env.PORT || 5000;
async function Connect() {
  await connectToDb()
    .then((db) => {
      initGridFS(db);
      app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
    })
    .catch((err) => console.log(err));
}

// Call the function to connect to the database
Connect();
