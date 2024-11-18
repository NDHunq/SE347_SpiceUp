const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipe/RecipeController')
const recipeCommentController = require('../controllers/recipe/RecipeCommentController')
const { route } = require('./user')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/update/:id',  recipeController.updateRecipe)
router.use('/delete/:id', recipeController.deleteRecipe)
router.use('/create',  recipeController.createRecipe)

router.use('/step/update/:id', recipeController.updateStep)
router.use('/step/delete/:id', recipeController.deleteStep)
router.use('/step', recipeController.createStep)

router.use('/get', recipeController.getRecipe)

router.use('/view/increase/', recipeController.increaseView)
router.use('/view', recipeController.getView)

router.use('/status/update', recipeController.updateStatus)

router.use('/comment/update/:id', recipeCommentController.editComment)
router.use('/comment/delete/:id', recipeCommentController.deleteComment)
router.use('/comment/get', recipeCommentController.getComment)
router.use('/comment', recipeCommentController.postComment)


module.exports = router