const User = require('../models/user')

class RegisterController {

    //[GET]
    async create(req,res) {
        const {email, password, phone, firstName, lastName, role, billingAddress, avatar} = req.body

        try {

            const newUser = new User({email, password, phone, firstName, lastName, role, billingAddress, avatar})

            await newUser.save()

            return res.status(200).json({
                message: 'create user successfully'
            })
        } catch {
            res.status(500).send({
                message: "Some error in registration. Try again!!"
            })
            console.log('Some error in registration. Try again!!')
        }
    }
}

module.exports = new RegisterController