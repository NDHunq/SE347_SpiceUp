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
    
            const getMonthlyData = async (month, year) => {
                const numberOfCustomerArray = await User.aggregate([
                    filterByDate(month, year, 'createdAt')
                ]);
    
                const numberOfCustomer = numberOfCustomerArray.length > 0 ? numberOfCustomerArray.length : 0;
    
                const numberOfSoldOutArray = await OrderItem.aggregate([
                    filterByDate(month, year, 'date_ordered'),
                    unWind('orderItems'),
                    totalSum('orderItems.quantities')
                ]);
    
                const numberOfSoldOut = numberOfSoldOutArray.length > 0 ? numberOfSoldOutArray[0].totalSum : 0;
    
                const profitArray = await Order.aggregate([
                    filterByDate(month, year, 'date_ordered'),
                    totalSum('total_cost')
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
                    filterByDate(month, year, 'created_at')
                ]);
    
                const numberOfProduct = numberOfProductArray.length > 0 ? numberOfProductArray.length : 0;
    
                return {
                    month,
                    totalCustomers: numberOfCustomer,
                    profit,
                    productsSoldOut: numberOfSoldOut,
                    recipeViews: views,
                    totalRecipes: numberOfRecipe,
                    totalProducts: numberOfProduct
                };
            };
    
            if (month && year) {
                // Handle specific month and year
                const data = await getMonthlyData(parseInt(month), parseInt(year));
                res.status(200).json(data);
            } else if (year) {
                // Handle year only
                const yearData = [];
                for (let i = 1; i <= 12; i++) {
                    const monthData = await getMonthlyData(i, parseInt(year));
                    if (
                        monthData.totalCustomers === 0 &&
                        monthData.profit === 0 &&
                        monthData.productsSoldOut === 0 &&
                        monthData.recipeViews === 0 &&
                        monthData.totalRecipes === 0 &&
                        monthData.totalProducts === 0
                    ) {
                        monthData.message = 'No data';
                    }
                    yearData.push(monthData);
                }
                res.status(200).json(yearData);
            } else {
                res.status(400).send("Please provide at least a year.");
            }
    
        } catch (e) {
            console.log("Some errors happen", e);
            res.status(500).send("Internal Server Error");
        }
    }
    
}

module.exports = new AnalysisController