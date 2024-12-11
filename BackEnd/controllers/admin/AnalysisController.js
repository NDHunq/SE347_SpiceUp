const connectToDb = require('../../config/db/db')
const User = require('../../models/user')
const OrderItem = require('../../models/order/orderItem')
const Order = require('../../models/order/order')
const Recipe = require('../../models/recipe/recipe')
const Product = require('../../models/Product')

class AnalysisController {
    async getAnalysis(req, res) {
        try {
            await connectToDb();
            const { month, year } = req.query;
    
            const filterByDate = (month, year, fieldName) => {
                const yearCondition = {
                    '$eq': [
                        { '$year': '$' + fieldName },
                        parseInt(year)
                    ]
                };
    
                // Include month condition only if the month is provided
                const conditions = month
                    ? [
                        yearCondition,
                        {
                            '$eq': [
                                { '$month': '$' + fieldName },
                                parseInt(month)
                            ]
                        }
                    ]
                    : [yearCondition];
    
                return {
                    '$match': {
                        '$expr': {
                            '$and': conditions
                        }
                    }
                };
            };
    
            const totalSum = (fieldName) => ({
                '$group': {
                    _id: null,
                    totalSum: { '$sum': '$' + fieldName }
                }
            });
    
            const unWind = (fieldName) => ({
                '$unwind': '$' + fieldName
            });
    
            const numberOfCustomerArray = await User.aggregate([
                filterByDate(month, year, 'createdAt')
            ]);
    
            const numberOfCustomer = numberOfCustomerArray.length > 0 ? numberOfCustomerArray.length : 0;
    
            const numberOfSoldOutArray = await OrderItem.aggregate([
                filterByDate(month, year, 'dateOrdered'),
                unWind('orderItems'),
                totalSum('orderItems.quantities')
            ]);
    
            const numberOfSoldOut = numberOfSoldOutArray.length > 0 ? numberOfSoldOutArray[0].totalSum : 0;
    
            const profitArray = await Order.aggregate([
                filterByDate(month, year, 'dateOrdered'),
                totalSum('totalCost')
            ]);
    
            const profit = profitArray.length > 0 ? profitArray[0].totalSum : 0;
    
            const viewsArray = await Recipe.aggregate([
                filterByDate(month, year, 'createdAt'),
                totalSum('views')
            ]);
    
            const views = viewsArray.length > 0 ? viewsArray[0].totalSum : 0;
    
            const numberOfRecipeArray = await Recipe.aggregate([
                filterByDate(month, year, 'createdAt')
            ]);
    
            const numberOfRecipe = numberOfRecipeArray.length > 0 ? numberOfRecipeArray.length : 0;
    
            const numberOfProductArray = await Product.aggregate([
                filterByDate(month, year, 'date_ordered')
            ]);
    
            const numberOfProduct = numberOfProductArray.length > 0 ? numberOfProductArray.length : 0;
    
            res.status(200).json({
                totalCustomers: numberOfCustomer,
                profit: profit,
                productsSoldOut: numberOfSoldOut,
                recipeViews: views,
                totalRecipes: numberOfRecipe,
                totalProducts: numberOfProduct
            });
    
        } catch (e) {
            console.log("Some errors happen", e);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new AnalysisController
