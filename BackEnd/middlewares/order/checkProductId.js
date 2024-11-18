const checkId = (req,res,next) => {
    const {productId, quantity} = req.query
    if(productId.length !== quantity.length) {
        return res.status(400).send('Some errors in product id')
    }
    next()
}

module.exports = checkId