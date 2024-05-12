const express = require('express')
const CheckoutColectionController = require('../../controllers/checkoutColectionController')

const router = express.Router()

router.get('/', CheckoutColectionController.getAll)


module.exports = router
