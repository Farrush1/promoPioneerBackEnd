const prisma = require('../libs/prisma')

class ProductService {
  static async getAll () {
    try {
      const result = await prisma.product.findMany()
      return { result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store () {
    try {
      const result = await prisma.product.create()
      return { result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ProductService
