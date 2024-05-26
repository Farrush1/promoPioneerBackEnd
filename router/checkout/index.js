const express = require('express')
const CheckoutController = require('../../controllers/checkoutController')
const AuthMiddleware = require('../../middleware/authenticate')
const router = express.Router()

// router.use(AuthMiddleware.authenticate)
router.get('/', CheckoutController.getAll)
router.get('/:id', AuthMiddleware.authenticate, CheckoutController.getById)
router.post('/products/:id', CheckoutController.storeProduct)
router.post('/carts',AuthMiddleware.authenticate, CheckoutController.storeCart)
router.post('/promo/:id', CheckoutController.promoCheckout)
// ignore this route
router.post('/cost', CheckoutController.cost)

module.exports = router
