const validate = (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    const errors = [];

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // console.log(email)
    // console.log(password)
    if (!email || !emailRegex.test(email)) {
        errors.push('Wrong email or password');
    }

    // Password validation
    if (!password || password.length < 8) {
        errors.push('Wrong email or password');
    }

    // Check for errors
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    return next()
}

const sanitizeInput = (req, res, next) => {
    for (const key in req.body) {
        req.body[key] = req.body[key].replace(/[\/"?$]/g, '')
    }
    return next()
}

module.exports = { validate, sanitizeInput }