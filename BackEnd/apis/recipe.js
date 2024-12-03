const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipe/RecipeController')
const recipeCommentController = require('../controllers/recipe/RecipeCommentController')
const { route } = require('./user')
const authenticate = require("../middlewares/auth/auth");
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/save/get/:user_id', authenticate, recipeController.getSavedRecipe)
router.use('/save/:recipe_id', authenticate, recipeController.setSaveState)


router.use('/update/:recipe_id', authenticate,  recipeController.updateRecipe)
router.use('/delete/:recipe_id', authenticate, recipeController.deleteRecipe)
router.use('/create', authenticate, recipeController.createRecipe)

router.use('/step/update/:step_id', authenticate, recipeController.updateStep)
router.use('/step/delete/:step_id', authenticate, recipeController.deleteStep)
router.use('/step/create',  recipeController.createStep)

router.use('/user/:user_id', authenticate, recipeController.getRecipe)

router.use('/get/:recipe_id', authenticate, recipeController.getRecipe)
router.use('/get', authenticate, recipeController.getRecipe)

router.use('/view/increase/:recipe_id', authenticate, recipeController.increaseView)
router.use('/view/:recipe_id', authenticate, recipeController.getView)

router.use('/status/update/:recipe_id', authenticate, recipeController.updateStatus)

router.use('/comment/update/:id', authenticate, recipeCommentController.editComment)
router.use('/comment/delete/:id', authenticate, recipeCommentController.deleteComment)
router.use('/comment/get/:recipe_id',  authenticate, recipeCommentController.getComment)
router.use('/comment', authenticate, recipeCommentController.postComment)


module.exports = router