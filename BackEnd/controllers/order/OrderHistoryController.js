const Order = require('../../models/order/order')
const OrderItems = require('../../models/order/orderItem')
const orderId = require('../../utils/counter')
const connectToDb = require('../../config/db/db')

class OrderHistoryController {

    //[POST] create neww order
    async createOrder(req, res) {
        try {
            await connectToDb()
            const [{value: email} , { value: date }, { value: totalCost }, { value: paymentMethod }, { value: shippingFee }, { value: productIds }] = req.body
            console.log('email',email)
            console.log('date', date)
            console.log('productIds',productIds.productId)
            const order = new Order({
                id: orderId,
                email: email,
                date: Date(date),
                totalCost: totalCost,
                paymentMethod: paymentMethod,
                shippingFee: shippingFee,
                productId: productIds.productId,
            })

            await order.save()

            res.status(201).json({
                id: order.id,
                message: 'Create order successfully'
            })

        } catch (e) {
            //res.status(500).send('Some errors happen', e)
            console.log(e)
        }       
    }

    async createOrderItems(req, res) {
        try {
            await connectToDb()
            const {productId, quantity} = req.query
            const orderItems = new OrderItems({
                productId: productId,
                quantity: quantity
            })

            await orderItems.save()

            res.status(201).json({
                id: orderItems.id,
                message: 'Create order successfully'
            })

        } catch (e) {
            //res.status(500).send('Some errors happen', e)
            console.log(e)
        }       
    }

    //[GET] get order
    async getOrderDetail(req, res) {
        try {
            await connectToDb()

            const { email } = req.query

            const order = await Order.find({ email: email })
            const orderItems = await order.populate('productId')
            if (order) {
                res.status(200).json(order,orderItems)
            } else {
                res.status(404).send('Order not found')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }

    async getOrderItems(req, res) {
        try {
            await connectToDb()

            const { orderId } = req.query

            const order = await Order.find({ id: orderId })
            .populate('productItemId')

            console.log(order)
            if (order) {
                res.status(200).json(order)
            } else {
                res.status(404).send('Order not found')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }


    //[POST] setBillingAddress
    async setBillingAddress(req, res) {

        try {
            await connectToDb()

            const [firstNameObj,
                lastNameObj,
                companyNameObj,
                countryObj,
                provinceObj,
                districtObj,
                communeObj,
                detailAddressObj,
                emailObj] = req.body

            const firstName = firstNameObj.value
            const lastName = lastNameObj.value
            const companyName = companyNameObj.value
            const country = countryObj.value
            const province = provinceObj.value
            const district = districtObj.value
            const commune = communeObj.value
            const detailAddress = detailAddressObj.value
            const email = emailObj.value

            const user = await User.findOne({ email: email })

            const billingAddressUpdate = {
                lastName: lastName,
                firstName: firstName,
                companyName: companyName,
                country: country,
                province: province,
                district: district,
                commune: commune,
                detailAddress: detailAddress
            }

            user.billingAddress = {
                ...billingAddressUpdate
            };

            console.log(user.billingAddress)

            await user.save()

            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.status(200).send('Add address successfully')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }

    }

    // async delete(req,res) {
    //     res.status(204).send();
    // }
}

module.exports = new OrderHistoryController