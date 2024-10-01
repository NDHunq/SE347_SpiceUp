const Order = require('../../models/order/order')
const OrderItems = require('../../models/order/orderItem')
const orderId = require('../../utils/counter')
const OrderItem = require('../models/order/orderItem')
const connectToDb = require('../../config/db/db')

class OrderHistoryController {

    //[POST] create neww order
    async createReview(req, res) {
        try {
            await connectToDb()
            const [{value: email} , { value: content }, { value: star }, { value: image }, { value: productId }, {value: orderId}] = req.body
            console.log('email',email)
            console.log('date', date)
            console.log('productIds',productIds.productId)
            const review = new review({
                productId:productId,
                email: email,
                content: content,
                star: star,
                image: image,
            })

            await review.save()

            const orderItem = await OrderItem.findOne({_id: orderId})
            orderItem.push(review._id)

            await orderItem.save()

            res.status(201).json({
                id: review.id,
                message: 'Create review successfully'
            })

        } catch (e) {
            //res.status(500).send('Some errors happen', e)
            console.log(e)
        }       
    }
    // async delete(req,res) {
    //     res.status(204).send();
    // }
}

module.exports = new OrderHistoryController