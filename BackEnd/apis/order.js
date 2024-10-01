const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order/OrderHistoryController')
const checkProductId = require('../middlewares/order/checkProductId')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/create',  orderController.createOrder)
router.use('/getorderinfo', orderController.getOrderDetail)
router.use('/getorderitems', checkProductId, orderController.getOrderDetail)

module.exports = router