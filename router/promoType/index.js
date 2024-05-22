const express = require('express')
const PromoTypeController = require('../../controllers/promoTypeController')
const router = express.Router()

router.get('/', PromoTypeController.getAll)
router.get('/promo/:id', PromoTypeController.getPromoByPromotype)

module.exports = router
