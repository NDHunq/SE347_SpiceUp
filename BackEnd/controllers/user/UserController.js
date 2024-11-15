const User = require('../../models/user')
const connectToDb = require('../../config/db/db')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

class UserController {

    //[GET] user info
    async getInfo(req, res) {
        await connectToDb()
        const { email } = req.query

        const userInfo = await User.find({ email }, { password: 0 })

        try {
            if (userInfo) {
                res.status(200).json(userInfo)
            } else {
                res.status(404).send('email not found')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }

    async updateInfo(req,res) {
        try {
            await connectToDb()

            const {email} = req.query
            const user = User.findOne({email: email})
            
            for (const key in req.body) {
                if (req.body.hasOwnProperty(key) && key !== 'password') {
                    user[key] = req.body[key]  
                }
            }

            await user.save()

            res.status(200).send("Update user info successfully")

        } catch(e) {
            res.status(500).send("Internal server error")
            console.log("Error", e)
        }
    }

    //[GET] getBillingAddress
    async getBillingAddress(req, res) {
        try {
            await connectToDb()

            const { email } = req.query

            const user = await User.findOne({ email: email })
            if (user) {
                res.status(200).json(user.billingAddress)
            } else {
                res.status(404).send('User not found')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }


    //[POST] setBillingAddress
    async setBillingAddress(req, res) {

        try {
            await connectToDb()

            const { firstName,
                lastName,
                companyName,
                country,
                province,
                district,
                commune,
                detailAddress,
                email } = req.body


            const user = await User.findOne({ email: email })

            const billingAddressUpdate = {
                lastName: lastName,
                firstName: firstName,
                companyName: companyName,
                country: country,
                province: province,
                district: district,
                commune: commune,
                detailAddress: detailAddress
            }

            user.billingAddress = {
                ...billingAddressUpdate
            };

            console.log(user.billingAddress)

            await user.save()

            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.status(200).send('Add address successfully')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }

    }

    async sendResetLink(req, res) {
        try {
            await connectToDb()

            const { email } = req.query
            const user = await User.findOne({ email: email })

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const resetToken = crypto.randomBytes(32).toString('hex')

            user.resetPasswordToken = resetToken

            await user.save()

            const resetUrl = `http://127.0.0.1:3000/reset_password/${resetToken}`

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Password Reset Request",
                html: `<p>Hi ${user.name},</p>
                   <p>We received a request to reset your password. Click the link below to set a new password:</p>
                   <a href="${resetUrl}">Reset your password</a>
                   <p>If you did not request this, you can ignore this email.</p>`,
            };

            transporter.sendMail(mailOptions);
        } catch (e) {
            res.status(400).send("Fail to send reset link")
            console.log("Error", e)
        }
        
    }

    async resetPassword(req,res) {
        try {
            await connectToDb()

            const {token} = req.param
            const {newPassword} = req.body

            const user = await User.findOne({resetPasswordToken: token})

            if(!user) {
                res.status(400).send("Invalid token")
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
        
            await user.save();
            
            res.status(200).send("Reset password successfully")
        } catch(e) {
            console.error("Error resetting password:", error);
            res.status(500).json({ message: "Internal server error" }); 
        }
    }

    // async delete(req,res) {
    //     res.status(204).send();
    // }
}

module.exports = new UserController