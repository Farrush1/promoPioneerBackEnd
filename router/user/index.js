const express = require('express')
const userController = require('../../controllers/userController')
const router = express.Router()
router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/change-address', userController.setAddress)

module.exports = router
