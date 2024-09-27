const User = require('../models/user')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

class LoginController {
    
    // verify login
    async verify(req,res) {
        const JWT_SECRET = process.env.JWT_SECRET
        const {email, password} = req.query
        console.log('abc')
        const user = await User.findOne({email})
        console.log('def')
        const isMatched = bcrypt.compare(password, user.password)

        try {
            if (isMatched) {
                const token = jwt.sign({ id: user._id, email: user.email},JWT_SECRET, {expiresIn: '1h'})

                res.json(token).send('login successfully')
            } else {
                res.status(401).send('wrong email or password')
            }
        } catch(e) {
            //res.send('Something wrong happens')
            console.log('error', e)
        }
    }

}

module.exports = new LoginController