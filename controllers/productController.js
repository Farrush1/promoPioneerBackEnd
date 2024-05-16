const prisma = require('../libs/prisma')

const ProductService = require('../services/productService')
const cloudinaryUpload = require('../libs/cloudinary')
class ProductController {
  static async getAllProducts (req, res, next) {
    try {
      const products = await ProductService.getAllProducts(req.query)
      return res.status(200).json(products)
    } catch (error) {
      console.error('Error get all products:', error)
      next(error)
    }
  }

  static async getProductById (req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductService.getProductById(productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      res.status(200).json(product)
    } catch (error) {
      next(error)
      console.error('Error get product by id:', error)
      res.status(500).json({ message: error.message })
    }
  }

  static async updateProduct (req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductService.updateProduct(productId, req.body)
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async deleteProduct (req, res, next) {
    try {
      const productId = req.params.id
      const product = await ProductService.deleteProduct(productId)
      res.status(200).json(product)
    } catch (error) {
      next(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async store (req, res, next) {
    try {
      const params = {
        file: req.file,
        body: req.body
      }
      const product = await ProductService.store(params)
      return res.status(200).json(product)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async upload (req, res) {
    try {
      const result = await cloudinaryUpload(req.file.path)
      res.status(200).json({
        success: true,
        message: 'Uploaded!',
        url: result.secure_url,

      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
  }

  static async delete (req, res, next) {
    try {
      const product = await prisma.product.deleteMany()
      console.log(product)
      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController
