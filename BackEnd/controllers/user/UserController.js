const User = require("../../models/user");
const connectToDb = require("../../config/db/db");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class UserController {
  //[GET] user info
  async getInfo(req, res) {
    await connectToDb();
    const { user_id } = req.params;

    const userInfo = user_id
      ? await User.findOne({ _id: user_id }, { password: 0 })
      : await User.find();

    try {
      if (userInfo) {
        res.status(200).json({
          userInfo: userInfo,
        });
      } else {
        res.status(404).send("email not found");
      }
    } catch (e) {
      console.log("Some errors happen", e);
    }
  }
  async getInfo2(req, res) {
    await connectToDb();
    const { user_id } = req.body;

    const userInfo = user_id
      ? await User.findOne({ _id: user_id }, { password: 0 })
      : await User.find();

    try {
      if (userInfo) {
        res.status(200).json({
          userInfo: userInfo,
        });
      } else {
        res.status(404).send("email not found");
      }
    } catch (e) {
      console.log("Some errors happen", e);
    }
  }

  async updateInfo(req, res) {
    try {
      await connectToDb();

      const { user_id } = req.params;
      const user = await User.findOne({ _id: user_id });

      for (const key in req.body) {
        user[key] = req.body[key];
      }

      await user.save();

      res.status(200).json({
        userInfo: user,
        message: "Update user info successfully",
      });
    } catch (e) {
      res.status(500).send(e);
      console.log("Error", e);
    }
  }

  async changePassword(req, res) {
    // debugger;
    const { user_id } = req.params;
    const { oldPassword, newPassword } = req.body;
    console.log("oldPassword", oldPassword);
    console.log("newPassword", newPassword);
    const setNewPassword = async (user) => {
      user.password = newPassword;
      await user.save();
    };
    try {
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare old password
      const isMatched = await bcrypt.compare(oldPassword, user.password); // Use the Promise version
      if (!isMatched) {
        return res.status(401).json({ message: "Wrong old password" });
      }

      // Update to new password
      await setNewPassword(user);

      // Send success response
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Password changed successfully",
        errors: null,
      });
    } catch (e) {
      console.log("Error", e);
      return res.status(500).send("Internal server error");
    }
  }

  //[GET] getBillingAddress
  async getBillingAddress(req, res) {
    try {
      await connectToDb();

      const { user_id } = req.params;

      const user = await User.findOne({ _id: user_id });
      if (user) {
        res.status(200).json({
          status: "success",
          code: 200,
          message: "Billing address found",
          data: user.billingAddress,
          errors: null,
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: "User not found",
          data: null,
          errors: "Invalid user_id",
        });
      }
    } catch (e) {
      console.log("Some errors happen", e);
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
      await connectToDb();

      const { user_email } = req.query;
      const user = await User.findOne({ email: user_email });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const resetToken = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = resetToken;

      await user.save();

      const resetUrl = `http://127.0.0.1:5000/api/v1/user/reset_password/${resetToken}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: user_email,
        subject: "Password Reset Request",
        html: `<p>Hi ${user.email},</p>
                   <p>We received a request to reset your password. Click the link below to set a new password:</p>
                   <a href="${resetUrl}">Reset your password</a>
                   <p>If you did not request this, you can ignore this email.</p>`,
      };

      transporter.sendMail(mailOptions);

      res.status(200).json({
        message: "send mail successfully",
      });
    } catch (e) {
      res.status(400).send("Fail to send reset link");
      console.log("Error", e);
    }
  }

  async resetPassword(req, res) {
    try {
      await connectToDb();

      const { token } = req.param;
      const { newPassword } = req.body;

      const user = await User.findOne({ resetPasswordToken: token });

      if (!user) {
        res.status(400).send("Invalid token");
      }

      user.password = newPassword;
      user.resetPasswordToken = undefined;

      await user.save();

      res.status(200).send("Reset password successfully");
    } catch (e) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async resetPasswordForm(req, res) {
    try {
      await connectToDb();

      const { token } = req.params;

      res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reset Password</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #f4f4f9;
                        }
                        .form-container {
                            background: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            width: 300px;
                            text-align: center;
                        }
                        input {
                            width: calc(100% - 20px);
                            padding: 10px;
                            margin: 10px 0;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                        }
                        button {
                            width: 100%;
                            padding: 10px;
                            background: #007bff;
                            color: #fff;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                        button:hover {
                            background: #0056b3;
                        }
                        .error-message, .success-message {
                            color: red;
                            margin-top: 10px;
                            display: none;
                        }
                        .success-message {
                            color: green;
                        }
                    </style>
                </head>
                <body>
                    <div class="form-container">
                        <h2>Reset Password</h2>
                        <form id="resetPasswordForm">
                            <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" required />
                            <input type="hidden" id="resetToken" name="token" value="${token}" />
                            <button type="submit">Reset Password</button>
                        </form>
                        <p id="responseMessage" class="error-message"></p>
                        <p id="successMessage" class="success-message"></p>
                    </div>
                    <script>
                        document.getElementById('resetPasswordForm').addEventListener('submit', async function (event) {
                            event.preventDefault();
    
                            const newPassword = document.getElementById('newPassword').value;
                            const token = document.getElementById('resetToken').value;
                            const responseMessage = document.getElementById('responseMessage');
                            const successMessage = document.getElementById('successMessage');
    
                            try {
                                const response = await fetch('http://127.0.0.1:5000/api/v1/user/reset_password/post', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ token, newPassword })
                                });
    
                                if (response.ok) {
                                    responseMessage.style.display = 'none';
                                    successMessage.textContent = "Password reset successfully!";
                                    successMessage.style.display = 'block';
                                } else {
                                    const errorData = await response.json();
                                    responseMessage.textContent = errorData.message || 'Failed to reset password.';
                                    responseMessage.style.display = 'block';
                                    successMessage.style.display = 'none';
                                }
                            } catch (error) {
                                responseMessage.textContent = 'Something went wrong. Please try again later.';
                                responseMessage.style.display = 'block';
                                successMessage.style.display = 'none';
                            }
                        });
                    </script>
                </body>
                </html>
            `);
    } catch (e) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async setBillingAddress(req, res) {
    const { user_id } = req.params;
    const {
      firstName,
      lastName,
      companyName,
      province,
      district,
      commune,
      detailAddress,
      email,
      phone,
    } = req.body;
    let { country } = req.body;
    if (!country) {
      country = "Việt Nam";
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
        data: null,
        errors: "Invalid user_id",
      });
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
        phone: phone,
      };
      if (user) {
        user.billingAddress = newBillingAddress;
        await user.save();
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "user not found",
          data: null,
          errors: "Invalid billing address",
        });
      }
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Billing address updated successfully",
        data: user.billingAddress,
        errors: null,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal server error",
        data: null,
        errors: err.message,
      });
      console.log(err);
    }
  }

  async resetPassword(req, res) {
    try {
      await connectToDb();
      debugger;
      const { token, newPassword } = req.body;
      console.log("req.params", req.params);
      console.log("token", token);

      const user = await User.findOne({ resetPasswordToken: token });

      if (!user) {
        res.status(400).send("Invalid token");
      }

      //const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = newPassword;
      user.resetPasswordToken = null;

      await user.save();

      res.status(200).send("Reset password successfully");
    } catch (e) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async resetPasswordForm(req, res) {
    try {
      await connectToDb();

      const { token } = req.params;

      res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reset Password</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #f4f4f9;
                        }
                        .form-container {
                            background: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            width: 300px;
                            text-align: center;
                        }
                        input {
                            width: calc(100% - 20px);
                            padding: 10px;
                            margin: 10px 0;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                        }
                        button {
                            width: 100%;
                            padding: 10px;
                            background: #007bff;
                            color: #fff;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                        button:hover {
                            background: #0056b3;
                        }
                        .error-message, .success-message {
                            color: red;
                            margin-top: 10px;
                            display: none;
                        }
                        .success-message {
                            color: green;
                        }
                    </style>
                </head>
                <body>
                    <div class="form-container">
                        <h2>Reset Password</h2>
                        <form id="resetPasswordForm">
                            <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" required />
                            <input type="hidden" id="resetToken" name="token" value="${token}" />
                            <button type="submit">Reset Password</button>
                        </form>
                        <p id="responseMessage" class="error-message"></p>
                        <p id="successMessage" class="success-message"></p>
                    </div>
                    <script>
                        document.getElementById('resetPasswordForm').addEventListener('submit', async function (event) {
                            event.preventDefault();
    
                            const newPassword = document.getElementById('newPassword').value;
                            const token = document.getElementById('resetToken').value;
                            const responseMessage = document.getElementById('responseMessage');
                            const successMessage = document.getElementById('successMessage');
    
                            try {
                                const response = await fetch('http://127.0.0.1:5000/api/v1/user/reset_password/post', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ token, newPassword })
                                });
    
                                if (response.ok) {
                                    responseMessage.style.display = 'none';
                                    successMessage.textContent = "Password reset successfully!";
                                    successMessage.style.display = 'block';
                                } else {
                                    const errorData = await response.json();
                                    responseMessage.textContent = errorData.message || 'Failed to reset password.';
                                    responseMessage.style.display = 'block';
                                    successMessage.style.display = 'none';
                                }
                            } catch (error) {
                                responseMessage.textContent = 'Something went wrong. Please try again later.';
                                responseMessage.style.display = 'block';
                                successMessage.style.display = 'none';
                            }
                        });
                    </script>
                </body>
                </html>
            `);
    } catch (e) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // async delete(req,res) {
  //     res.status(204).send();
  // }
}

module.exports = new UserController();
