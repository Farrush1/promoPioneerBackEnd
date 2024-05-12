const express = require('express')
const CheckoutController = require('../../controllers/checkoutController')
const router = express.Router()

router.get('/', CheckoutController.getAll)
router.get('/:id', CheckoutController.getById)
router.post('/products/:id', CheckoutController.storeProduct)
router.post('/promo/:id', CheckoutController.promoCheckout)
// ignore this route
router.post('/cost', CheckoutController.cost)

module.exports = router
