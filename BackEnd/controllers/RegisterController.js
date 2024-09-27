const User = require('../models/user')
const mongoose = require('mongoose')
mongoose.set('debug',true)

class RegisterController {

    //[POST]
    async create(req, res) {
        console.log('abc')


        try {
            const [emailObj, passwordObj, phoneObj, firstNameObj, lastNameObj, roleObj, billingAddressObj, avatarObj] = req.body

            const email = emailObj.value;
            const password = passwordObj.value;
            const phone = phoneObj.value;
            const firstName = firstNameObj.value;
            const lastName = lastNameObj.value;
            const role = roleObj.value;
            const billingAddress = billingAddressObj.value;
            const avatar = avatarObj.value;

            const newUser = User({
                email: email,
                password: password,
                phone: phone,
                firstname: firstName,
                lastname: lastName,
                role: role,
                billingAddress: billingAddress,
                avatar: avatar
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