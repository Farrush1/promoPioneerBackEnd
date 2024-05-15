const express = require('express')
const userController = require('../../controllers/userController')
const upload = require('../../middleware/multer')
const router = express.Router()
router.get('/', userController.getAll)
router.get('/bio', userController.getBio)
router.put('/bio',upload.single('avatar'), userController.updateBio)
router.get('/:id', userController.getById)
router.post('/change-address', userController.setAddress)

module.exports = router
