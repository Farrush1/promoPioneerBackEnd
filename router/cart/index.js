const express = require('express')
const CartController = require('../../controllers/cartController')
const AuthMiddleware = require('../../middleware/authenticate')
const router = express.Router()

router.use(AuthMiddleware.authenticate)
router.get('/', CartController.getAll)
router.post('/cart-items', CartController.store)
router.delete('/cart-items/:id', CartController.destroy)

module.exports = router
