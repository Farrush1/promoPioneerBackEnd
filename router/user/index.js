const express = require('express')
const userController = require('../../controllers/userController')
const upload = require('../../middleware/multer')
const AuthMiddleware = require('../../middleware/authenticate')
const router = express.Router()
router.use(AuthMiddleware.authenticate)
router.get('/bio', userController.getBio)
router.put('/bio', upload.single('avatar'), userController.updateBio)
router.post('/change-address', userController.setAddress)
router.use(AuthMiddleware.authorization)
router.get('/', userController.getAll)
router.get('/:id', userController.getById)

module.exports = router
