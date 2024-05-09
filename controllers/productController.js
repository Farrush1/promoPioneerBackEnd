const ProductService = require('../services/productService')

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const product = await ProductService.getAllProducts()
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async getProductById(req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductService.getProductById(productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }
  static async createProduct(req, res, next) {
    try {
      const product = await ProductService.createProduct(req.body)
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductService.updateProduct(productId, req.body)
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductService.deleteProduct(req.body)
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = ProductController
