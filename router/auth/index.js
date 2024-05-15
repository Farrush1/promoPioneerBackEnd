const express = require('express')
const AuthController = require('../../controllers/authController')
const AuthMiddleware = require('../../middleware/authenticate')

const router = express.Router()

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/logout', AuthController.logout)

module.exports = router
