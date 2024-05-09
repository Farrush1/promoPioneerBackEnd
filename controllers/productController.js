const ProductService = require('../services/productService')

class ProductController {
  static async getAll (req, res, next) {
    try {
      const product = await ProductService.getAll()
      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const product = await ProductService.store(req.body)
      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController
