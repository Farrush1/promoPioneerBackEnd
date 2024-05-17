const WarehouseService = require('../services/warehouseService')

class WarehouseController {
  static getAll = async (req, res, next) => {
    try {
      const warehouse = await WarehouseService.getAll()
      res.status(200).json(warehouse)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WarehouseController
