const User = require('../../models/user')
const connectToDb = require('../../config/db/db')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

class UserController {

    //[GET] user info
    async getInfo(req, res) {
        await connectToDb()
        const { user_id } = req.params

        const userInfo = user_id ? await User.findOne({ _id: user_id }, { password: 0 }) : await User.find()

        try {
            if (userInfo) {
                res.status(200).json({
                    userInfo: userInfo
                })
            } else {
                res.status(404).send('email not found')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }

    async updateInfo(req, res) {
        try {
            await connectToDb()

            const { user_id } = req.params
            const user = await User.findOne({ _id: user_id })

            for (const key in req.body) {
                if (req.body.hasOwnProperty(key) && key !== 'password') {
                    user[key] = req.body[key]
                }
            }

            await user.save()

            res.status(200).json({
                userInfo: user,
                message: "Update user info successfully"
            })

        } catch (e) {
            res.status(500).send("Internal server error")
            console.log("Error", e)
        }
    }

    async changePassword(req, res) {
        // debugger;
        const {user_id} = req.params
        const {oldPassword, newPassword} = req.body
        try {
            const user = await User.findOne({ _id: user_id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }


            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Wrong old password" });
            }


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);


            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ message: "Password updated successfully" });
        } catch (e) {
            console.log("Error", e)
            return res.status(500).send("Internal server error")
        }
    }

    //[GET] getBillingAddress
    async getBillingAddress(req, res) {
        try {
            await connectToDb()

            const { user_id } = req.params

            const user = await User.findOne({ _id: user_id })
            if (user) {
                res.status(200).json(
                    {
                        status: 'success',
                        code: 200,
                        message: 'Billing address found',
                        data: user.billingAddress,
                        errors: null
                    }
                )
            } else {
                res.status(404).json(
                    {
                        status: 'error',
                        code: 404,
                        message: 'User not found',
                        data: null,
                        errors: 'Invalid user_id'
                    }
                )
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }


    //[POST] setBillingAddress
    // async setBillingAddress(req, res) {

    //     try {
    //         await connectToDb()
    //         const 
    //         const { firstName,
    //             lastName,
    //             companyName,
    //             country,
    //             province,
    //             district,
    //             commune,
    //             detailAddress,
    //             email } = req.body


    //         const user = await User.findOne({ email: email })

    //         const billingAddressUpdate = {
    //             lastName: lastName,
    //             firstName: firstName,
    //             companyName: companyName,
    //             country: country,
    //             province: province,
    //             district: district,
    //             commune: commune,
    //             detailAddress: detailAddress
    //         }

    //         user.billingAddress = {
    //             ...billingAddressUpdate
    //         };

    //         console.log(user.billingAddress)

    //         await user.save()

    //         if (!user) {
    //             res.status(404).send('User not found')
    //         } else {
    //             res.status(200).send('Add address successfully')
    //         }
    //     } catch (e) {
    //         console.log('Some errors happen', e)
    //     }

    // }

    async sendResetLink(req, res) {
        try {
            await connectToDb()

            const { user_id } = req.query
            const user = await User.findOne({ _id: user_id })

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

    async resetPassword(req, res) {
        try {
            await connectToDb()

            const { token } = req.param
            const { newPassword } = req.body

            const user = await User.findOne({ resetPasswordToken: token })

            if (!user) {
                res.status(400).send("Invalid token")
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;

            await user.save();

            res.status(200).send("Reset password successfully")
        } catch (e) {
            console.error("Error resetting password:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async setBillingAddress(req, res) {
        const { user_id } = req.params;
        const { firstName, lastName, companyName, province, district, commune, detailAddress, email, phone } = req.body;
        let { country } = req.body;
        if (!country) {
            country = 'Việt Nam';
        }

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(404).json(
                {
                    status: 'error',
                    code: 404,
                    message: 'User not found',
                    data: null,
                    errors: 'Invalid user_id'
                }
            );
        }

        try {
            const user = await User.findOne({ _id: user_id });
            const newBillingAddress = {
                firstName: firstName,
                lastName: lastName,
                companyName: companyName,
                country: country,
                province: province,
                district: district,
                commune: commune,
                detailAddress: detailAddress,
                email: email,
                phone: phone
            }
            if (user) {
                user.billingAddress = newBillingAddress
                await user.save();
            }
            else {
                return res.status(404).json(
                    {
                        status: 'error',
                        code: 404,
                        message: 'user not found',
                        data: null,
                        errors: 'Invalid billing address'
                    }
                );
            }

            res.status(200).json(
                {
                    status: 'success',
                    code: 200,
                    message: 'Billing address updated successfully',
                    data: user.billingAddress,
                    errors: null
                }
            );
        }
        catch (err) {
            res.status(500).json(
                {
                    status: 'error',
                    code: 500,
                    message: 'Internal server error',
                    data: null,
                    errors: err.message
                }
            );
            console.log(err);
        }
    }

    // async delete(req,res) {
    //     res.status(204).send();
    // }
}

module.exports = new UserController