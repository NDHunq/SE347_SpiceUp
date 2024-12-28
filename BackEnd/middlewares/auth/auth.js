    const User = require('../../models/user')
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    const authenticate = (req,res,next) => {
        let token = req.headers['authorization'];
        if (!token) {
            console.log(token);
            return res.status(401).json(
                {
                    status: 'error',
                    code: 401,
                    message: 'Authorization header is required',
                    data: null,
                    errors: 'Unauthorized'
                }
            );
        }
        else {
            token = token.split(' ')[1];
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json(
                    {
                        status: 'error',
                        code: 401,
                        message: 'Invalid token. You need to login first',
                        data: null,
                        errors: 'Unauthorized'
                    }
                );
            }

            req.user = user;
            next();
        })    
    }

    module.exports = authenticate