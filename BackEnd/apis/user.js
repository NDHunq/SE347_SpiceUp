const express = require('express')
const router = express.Router()

const userController = require('../controllers/user/UserController')



router.use(express.json())
router.use('/info',userController.getInfo)
router.use('/info/update',userController.updateInfo)
router.use('/reset_password/send', userController.sendResetLink)
router.use('/reset_password/:token', userController.resetPassword)


router.post('/billingAddress', userController.setBillingAddress)
router.get('/billingAddress', userController.getBillingAddress)

// router.delete('/delete',UserController.delete)

module.exports = router