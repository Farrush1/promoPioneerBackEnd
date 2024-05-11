const CheckoutService = require('../services/checkoutService')
const shippingCost = require('../utils/shippingCost')

class CheckoutController {
  static async getAll (req, res, next) {
    try {
      const checkouts = await CheckoutService.getAll()
      res.status(200).json(checkouts)
    } catch (error) {
      next(error)
    }
  }

  static async storeProduct (req, res, next) {
    try {
      const params = {
        cookie: req.cookies,
        body: req.body,
        productId: req.params
      }
      const checkouts = await CheckoutService.storeProduct(params)
      res.status(200).json(checkouts)
    } catch (error) {
      next(error)
    }
  }

  static async cost (req, res, next) {
    try {
      const { origin, destination, weight, courier } = req.body
      const checkouts = await shippingCost(origin, destination, weight, courier)
      res.status(200).json(checkouts)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CheckoutController
