const User = require('../../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    
    // verify login
    async verify(req,res) {
        const JWT_SECRET = process.env.JWT_SECRET
        const {email, password} = req.body
        console.log()
        console.log('abc')
        const user = await User.findOne({email})
        
        console.log('def')
        


            const isMatched = bcrypt.compare(password, user.password, (err,data)=> {
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    const token = jwt.sign({ id: user._id, email: user.email},JWT_SECRET, {expiresIn: '1h'})
                    return res.json({
                        'jwt': token,
                        'role': user.role,
                        'message': 'login successfully'
                    })
                } else {
                    return res.status(401).json({ message: "wrong email or password" })
                }

            })

    }

    // async get(req,res) {
    //     res.status(405).send('Method Not Allowed');
    // }
    
}

module.exports = new LoginController