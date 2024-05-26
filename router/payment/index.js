const express = require('express')
const PaymentController = require('../../controllers/paymentController')
const upload = require('../../middleware/multer')
const AuthMiddleware = require('../../middleware/authenticate')
const router = express.Router()

router.use(AuthMiddleware.authenticate)
router.get('/', PaymentController.getAll)
router.get('/stats', PaymentController.countPayment)
router.get('/:id', PaymentController.getById)
router.post('/', PaymentController.store)
router.put('/proof/:id', upload.single('payment_proof'), PaymentController.uploadProof)
router.put('/status/:id', PaymentController.changeStatus)

module.exports = router
