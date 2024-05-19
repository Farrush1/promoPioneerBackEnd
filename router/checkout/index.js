const express = require('express')
const CheckoutController = require('../../controllers/checkoutController')
const AuthMiddleware = require('../../middleware/authenticate')
const router = express.Router()

router.get('/', CheckoutController.getAll)
router.get('/:id',AuthMiddleware.authenticate, CheckoutController.getById)
router.post('/products/:id', CheckoutController.storeProduct)
router.post('/carts', CheckoutController.storeCart)
router.post('/promo/:id', CheckoutController.promoCheckout)
// ignore this route
router.post('/cost', CheckoutController.cost)

module.exports = router
