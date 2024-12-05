const User = require('../models/user')

class RegisterController {

    //[GET]
    async create(req,res) {
        const {email, password} = req.body

        try {

            const newUser = new User({
                email: email,
                password: password,
                role: "RS1"
            })

            await newUser.save()

            return res.status(200).json({
                message: 'create user successfully'
            })
        } catch(e) {
            res.status(500).send({
                message: "Some error in registration. Try again!!"
            })
            console.log(e)
        }
    }
}

module.exports = new RegisterController