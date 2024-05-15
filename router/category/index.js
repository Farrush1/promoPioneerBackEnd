const express = require('express')
const CategoryController = require('../../controllers/categoryController')
const router = express.Router()

router.get('/', CategoryController.getAll)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)
router.get('/city', CategoryController.getCity)

module.exports = router
