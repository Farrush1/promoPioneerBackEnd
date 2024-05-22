const PromoTypeService = require('../services/promoTypeService')

class PromoTypeController {
  static getAll = async (req, res, next) => {
    try {
      const promoType = await PromoTypeService.getAll()
      res.status(200).json(promoType)
    } catch (error) {
      next(error)
    }
  }

  static getPromoByPromotype = async (req, res, next) => {
    try {
      const promoType = await PromoTypeService.getPromoByPromotype(req.params.id)
      res.status(200).json(promoType)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PromoTypeController
