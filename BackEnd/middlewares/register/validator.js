const User = require('../../models/user')

const validate = (req, res, next) => {
    console.log(req.body)
    const { email, phone, password } = req.body

    const errors = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid email format.');
    }

    // Password validation
    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
    }

    // Phone validation
    // const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    // if (!phone || !phoneRegex.test(phone)) {
    //     errors.push('Invalid phone number format.');
    // }

    // Check for errors
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}

async function checkDuplicate(req, res,next) {
    const email = req.body
    const duplicateEmail = await User.findOne({ email: email })

    if(duplicateEmail) {
        return res.status(409).json({
            message: 'existed email'
        })
    }

    next()
}

module.exports = {validate, checkDuplicate}