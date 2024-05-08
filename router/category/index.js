const express = require('express')
const CategoryController = require('../../controllers/categoryController')
const router = express.Router()

router.get('/', CategoryController.getAll)
// ignore this route
router.get('/city', CategoryController.getCity)

module.exports = router
