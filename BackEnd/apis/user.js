const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/auth/auth')

const userController = require('../controllers/user/UserController')



router.use(express.json())
router.use('/info',userController.getInfo)

router.post('/billingAddress', userController.setBillingAddress)
router.get('/billingAddress', userController.getBillingAddress)

// router.delete('/delete',UserController.delete)

module.exports = router