const express = require('express')
const router = express.Router()

const loginController = require('../controllers/login/LoginController')
const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/', validate, sanitizeInput, loginController.verify)

module.exports = router