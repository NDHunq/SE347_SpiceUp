const express = require('express')
const router = express.Router()

const registerController = require('../controllers/login/RegisterController')
const {validate, checkDuplicate} = require('../middlewares/register/validator')

router.use(express.json())
router.use('/', validate, checkDuplicate, registerController.create)

module.exports = router