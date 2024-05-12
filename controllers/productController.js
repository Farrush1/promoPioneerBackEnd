const ProductService = require('../services/productService')
const cloudinaryUpload = require('../libs/cloudinary')
const prisma = require('../libs/prisma')
class ProductController {
  static async getAll(req, res, next) {
    try {
      const product = await ProductService.getAll()
      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const params = {
        file: req.file,
        body: req.body,
      }
      const product = await ProductService.store(params)
      return res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async upload(req, res) {
    try {
      const result = await cloudinaryUpload(req.file.path)
      res.status(200).json({
        success: true,
        message: 'Uploaded!',
        url: result.url,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: 'Error',
      })
    }
  }

  static async delete(req, res, next) {
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
