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
const cityRoute = require('./city/index')
const provinceRoute = require('./province/index')
const wareHouseRoute = require('./warehouse/index')
const anonimusRoute = require('./anonym/index')

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
router.use('/api/cities', cityRoute)
router.use('/api/provinces', provinceRoute)
router.use('/api/warehouses', wareHouseRoute)
router.use('/api/anonimus', anonimusRoute)

module.exports = router
