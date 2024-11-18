const express = require('express')
const router = express.Router()

const analysisController = require('../controllers/admin/AnalysisController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/analysis',  analysisController.getAnalysis)



module.exports = router