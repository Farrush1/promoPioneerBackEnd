const prisma = require('../libs/prisma')
const CategoryService = require('../services/categoryService')
const dotenv = require('dotenv')
dotenv.config()
class CategoryController {
  static async getAll (req, res, next) {
    try {
      const category = await CategoryService.getAll()
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }

  // ignore this method
  static async getCity (req, res, next) {
    try {
      const getCity = await prisma.city.findMany({
        orderBy: {
          id: 'asc'
        }
      })
      res.status(200).json(getCity)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = CategoryController
