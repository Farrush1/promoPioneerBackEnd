const express = require('express')
const CheckoutController = require('../../controllers/checkoutController')
const router = express.Router()

router.get('/', CheckoutController.getAll)
router.post('/', CheckoutController.store)
// ignore this route
router.post('/cost', CheckoutController.cost)

module.exports = router
