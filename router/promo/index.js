const express = require('express')
const PromoController = require('../../controllers/promoController')
const router = express.Router()

router.get('/', PromoController.getAll)
router.post('/', PromoController.store)
router.post('/products/:id', PromoController.storeProductPromo)

module.exports = router
