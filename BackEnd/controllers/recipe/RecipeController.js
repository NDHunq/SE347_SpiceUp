const connectToDb = require('../../config/db/db')
const Recipe = require('../../models/recipe/recipe')
const RecipeStep = require('../../models/recipe/recipeStep')
const Comment = require('../../models/feedBack/comment')

class RecipeController {

    //[POST] create neww Recipe
    async createRecipe(req, res) {
        try {
            await connectToDb()
            const { recipeName, description, cookingTimeInSecond, email, recipeIds, tag, ingredients } = req.body
            const recipe = new Recipe({
                recipeName: recipeName,
                email: email,
                description: description,
                cookingTimeInSecond: cookingTimeInSecond,
                tag: tag,
                createdAt: new Date,
                step: recipeIds,
                ingredients: ingredients
            })

            await recipe.save()

            res.status(201).json({
                id: recipe._id,
                message: 'Create recipe successfully'
            })

        } catch (e) {
            //res.status(500).send('Some errors happen', e)
            console.log(e)
        }
    }

    async updateRecipe(req, res) {
        try {
            await connectToDb()
            const { email } = req.query
            const { id } = req.param
            const recipe = Recipe.findOne({ email: email, _id: id, isDeleted: false })

            for (const key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    recipe[key] = req.body[key]
                }
            }

            await recipe.save()

            res.status(201).send("Update recipe successfully")

        } catch (e) {
            res.status(500).send('Some errors happen', e)
            console.log(e)
        }
    }

    async deleteRecipe(req, res) {
        try {
            connectToDb()
            const { id } = req.param

            const recipe = await Recipe.findOne({ _id: id })
            recipe.isDeleted = true

            recipe.save()

            res.status(200).send("Delete recipe successfully")
        } catch (e) {
            //res.status(500).send("Internal server error")
            console.log("Error", e)
        }
    }

    async createStep(req, res) {
        try {
            await connectToDb()

            let recipeIds = []
            for (let i = 0; i < req.body.length; i++) {
                const { stepNumber, description, image } = req.body[i]

                const recipeStep = new RecipeStep({
                    stepNumber: stepNumber,
                    description: description,
                    image: image
                })


                await recipeStep.save()

                recipeIds.push(recipeStep._id)
            }

            res.status(201).json({
                recipeIds: recipeIds,
                message: 'Create step successfully'
            })
        } catch (e) {
            console.log("error", e)
        }

    }

    async updateStep(req, res) {
        try {
            await connectToDb()

            const { id } = req.param

            const recipeStep = await RecipeStep.findOne({ _id: id, isDeleted: false })
            for (const key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    recipeStep[key] = req.body[key]
                }
            }

            await recipeStep.save()
            res.status(201).send("Update recipe successfully")
        } catch (e) {
            res.status(500).send("Internal server error")
            console.log("Error", e)
        }
    }

    async deleteStep(req, res) {
        try {
            connectToDb()
            const { id } = req.param

            const recipe = await Recipe.findOne({ _id: id })
            recipe.isDeleted = true

            recipe.save()

            res.status(200).send("Delete recipe step successfully")
        } catch (e) {
            res.status(500).send("Internal server error")
            console.log("Error", e)
        }
    }

    async getRecipe(req, res) {

        try {
            await connectToDb()
            const { email } = req.query
            if (email) {
                
                const recipe = await Recipe.find({ email: email, isDeleted: false }).populate("step")
                if (recipe) {
                    res.status(200).json(recipe)
                } else {
                    res.status(404).send('No recipe found')
                }
            } else {
                const recipes = await Recipe.find({ isDeleted: false })
                if (recipes) {
                    res.status(200).json(recipes)
                } else {
                    res.status(404).send('No recipe found')
                }
            }

        } catch (e) {
            console.log("error", e)
        }

    }
    // async delete(req,res) {
    //     res.status(204).send();
    async increaseView(req, res) {
        try {
            await connectToDb()

            const { id } = req.query
            const recipe = await Recipe.findOne({_id:id, isDeleted: false})
            recipe.views = recipe.views + 1
            console.log("recipe.views", recipe.views)
            await recipe.save()
            // await Recipe.updateOne(
            //     { _id: id },
            //     {
            //         '$inc': {
            //             'views': 1
            //         }
            //     }
            // )

            res.status(200).send('Update views successfully')
        } catch (e) {
            console.log('some errors happen', e)
        }
    }

    async getView(req, res) {
        try {
            await connectToDb()

            const { id } = req.query

            const recipe = await Recipe.findOne({ _id: id, isDeleted: false })

            res.status(200).json({
                views: recipe.views
            })
        } catch (e) {
            console.log('some errors happen', e)
        }

    }

    async updateStatus(req, res) {
        try {
            await connectToDb()

            const { id, status } = req.query

            const recipe = await Recipe.findOne({ _id: id, isDeleted: false })

            recipe.status = status
            recipe.save()

            res.status(200).send("App")
        } catch (e) {
            console.log('some errors happen', e)
        }
    }

}

module.exports = new RecipeController