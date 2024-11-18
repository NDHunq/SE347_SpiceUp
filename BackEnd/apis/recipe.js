const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipe/RecipeController')
const recipeCommentController = require('../controllers/recipe/RecipeCommentController')
const { route } = require('./user')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/update/:recipe_id',  recipeController.updateRecipe)
router.use('/delete/:recipe_id', recipeController.deleteRecipe)
router.use('/create',  recipeController.createRecipe)

router.use('/step/update/:step_id', recipeController.updateStep)
router.use('/step/delete/:step_id', recipeController.deleteStep)
router.use('/step/create', recipeController.createStep)

router.use('/get', recipeController.getRecipe)

router.use('/view/increase/:recipe_id', recipeController.increaseView)
router.use('/view/:recipe_id', recipeController.getView)

router.use('/status/update/:recipe_id', recipeController.updateStatus)

router.use('/comment/update/:id', recipeCommentController.editComment)
router.use('/comment/delete/:id', recipeCommentController.deleteComment)
router.use('/comment/get', recipeCommentController.getComment)
router.use('/comment', recipeCommentController.postComment)


module.exports = router