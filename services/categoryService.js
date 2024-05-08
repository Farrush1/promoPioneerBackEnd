const prisma = require('../libs/prisma')

class CategoryService {
  static async getAll (req, res, next) {
    try {
      const category = await prisma.category.findMany()
      return { message: 'get all category', category }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = CategoryService
