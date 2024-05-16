const express = require('express')
const CartController = require('../../controllers/cartController')
const router = express.Router()

router.get('/', CartController.getAll)
router.post('/cart-items', CartController.store)
router.delete('/cart-items/:id', CartController.destroy)

module.exports = router
