const User = require('../../models/user')
const mongoose = require('mongoose')
const { setBillingAddres } = require('../user/UserController')
mongoose.set('debug',true)

class RegisterController {

    //[POST]
    async create(req, res) {
        console.log(req.body)


        try {
            const {email ,password ,phone ,firstName ,lastName ,role ,avatar} = req.body

            const newUser = User({
                email: email,
                password: password,
                phone: phone,
                firstname: firstName,
                lastname: lastName,
                //billingAddress: null,
                role: role,
                avatar: "6774082b02832c2073356445",
                createdAt: new Date()                
            })

            console.log(newUser)

            await newUser.save()

            return res.status(200).json({
                message: 'create user successfully'
            })
        } catch(e) {
            console.log('Some error in registration. Try again!!', e)
        }
    }
}

module.exports = new RegisterController
