const express = require('express')
const router = express.Router()

const authRoute = require('./auth/index')
const categoryRoute = require('./category/index')
const productRoute = require('./product/index')
const checkoutRoute = require('./checkout/index')
const checkoutColectionRoute = require('./checkoutCollection/index')
const userRoute = require('./user/index')
const cartRoute = require('./cart/index')
const promoRoute = require('./promo/index')
const paymentRoute = require('./payment/index')
// const authRouter = require("./auth/authRouter");

router.get('/api/hello', function (req, res) {
  res.status(200).json({ message: 'hello world' })
})
router.use('/api/categories', categoryRoute)
router.use('/api/auth', authRoute)
router.use('/api/products', productRoute)

router.use('/api/checkouts', checkoutRoute)
router.use('/api/checkouts-colection', checkoutColectionRoute)

router.use('/api/users', userRoute)
router.use('/api/carts', cartRoute)
router.use('/api/promo', promoRoute)
router.use('/api/payments', paymentRoute)


module.exports = router
