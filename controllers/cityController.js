const CityService = require('../services/cityService')

class CityController {
  static getAll = async (req, res, next) => {
    try {
      const city = await CityService.getAll()
      res.status(200).json(city)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CityController
