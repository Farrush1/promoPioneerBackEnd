const dotenv = require('dotenv')
const PromoService = require('../services/promoService')
dotenv.config()
class PromoController {
  static async getAll (req, res, next) {
    try {
      const promo = await PromoService.getAll()
      return res.status(200).json(promo)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const promo = await PromoService.store(req.body)
      return res.status(200).json(promo)
    } catch (error) {
      next(error)
    }
  }

  static async storeProductPromo (req, res, next) {
    try {
      const params = {
        body: req.body,
        productId: req.params.id
      }
      const promo = await PromoService.storeProductPromo(params)
      return res.status(200).json(promo)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PromoController