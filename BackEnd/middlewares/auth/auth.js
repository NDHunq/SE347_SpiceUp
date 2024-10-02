const User = require('../../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).send("access forbidden")
        }

        req.user = user
        next()
    })    
}

module.exports = authenticate