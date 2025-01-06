const User = require("../models/user");

class RegisterController {
  //[GET]
  async create(req, res) {
    const { email, password, phone, firstName, lastName, role, avatar } = req.body
    try {
      const newUser = new User({
        email: email,
        password: password,
        phone: phone,
        firstname: firstName,
        lastname: lastName,
        //billingAddress: null,
        role: role,
        avatar: "6774082b02832c2073356445",
        createdAt: new Date()
      });

      await newUser.save();

      return res.status(200).json({
        message: "create user successfully",
      });
    } catch (e) {
      res.status(500).send({
        message: "Some error in registration. Try again!!",
      });
      console.log(e);
    }
  }
}

module.exports = new RegisterController();
