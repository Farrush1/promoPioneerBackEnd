const CheckoutService = require('../services/checkoutService')

class CheckoutController {
  static async getAll (req, res, next) {
    try {
      const checkouts = await CheckoutService.getAll()
      return checkouts
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const params = {
        cookie: req.cookies,
        body: req.body,
      }
      console.log(params.cookie, "--------")
      const checkouts = await CheckoutService.store(params)
      res.status(200).json(checkouts) 
    } catch (error) {
      next(error)
    }
  }

  static async cost (req, res, next) {
    try {
      const checkouts = await CheckoutService.cost(req.body)
      res.status(200).json(checkouts)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CheckoutController
