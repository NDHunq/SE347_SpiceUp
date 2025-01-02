const User = require('../../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    
    
    // verify login
    async verify(req,res) {
        const JWT_SECRET = process.env.JWT_SECRET
        const {email, password} = req.body
        const user = await User.findOne({email:email})
        //console.log(user.password)
        try{
            const isMatched = bcrypt.compare(password, user.password, (err,data)=> {
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    const token = jwt.sign({ id: user._id, email: user.email, role: user.role},JWT_SECRET, {expiresIn: '5h'})
                    return res.json({
                        status: 'success',
                        code: 200,
                        message: 'Login successfully',
                        data: {
                            jwt: token,
                            role: user.role,
                            user_id: user._id,
                            email: user.email,
                            avatar: user.avatar
                        },
                        errors: null
                    })
                } else {
                    return res.status(401).json({ message: "wrong email or password" })
                }

            })
        } catch(e) {
            console.log("error", e)
            res.json({
                message: "user not existed"
            })
        }
            

    }

    // async get(req,res) {
    //     res.status(405).send('Method Not Allowed');
    // }
    
}

module.exports = new LoginController
