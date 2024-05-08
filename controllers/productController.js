const ProductService = require("../services/productService")

class ProductController {
  static async getAll (req, res, next) {
    try {
		const product = await ProductService.getAll()
		 res.status(200).json(product)
    } catch (error) {
		next(error)
	}
  }
}

module.exports = ProductController
