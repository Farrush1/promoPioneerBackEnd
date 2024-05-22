const express = require('express')
const PromoTypeController = require('../../controllers/promoTypeController')
const router = express.Router()

router.get('/', PromoTypeController.getAll)

module.exports = router
