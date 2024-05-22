const express = require('express')
const PromoController = require('../../controllers/promoController')
const router = express.Router()

router.get('/', PromoController.getAll)
router.post('/', PromoController.store)
router.get('/:id', PromoController.getById)
router.put('/:id', PromoController.update)
router.delete('/:id', PromoController.destroy)
router.post('/products/:id', PromoController.storeProductPromo)

module.exports = router
