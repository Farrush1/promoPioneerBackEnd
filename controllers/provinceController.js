const ProvinceService = require('../services/provinceService')

class ProvinceController {
  static getAll = async (req, res, next) => {
    try {
      const province = await ProvinceService.getAll()
      res.status(200).json(province)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProvinceController
