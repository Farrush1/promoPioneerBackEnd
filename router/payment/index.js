const express = require('express')
const PaymentController = require('../../controllers/paymentController')
const upload = require('../../middleware/multer')
const router = express.Router()
router.get('/', PaymentController.getAll)
router.post('/', PaymentController.store)
router.put('/proof/:id', upload.single('payment_proof'), PaymentController.uploadProof)

module.exports = router
