const CategoryService = require('../services/categoryService')
const dotenv = require('dotenv')
dotenv.config()
class CategoryController {
  static getAll = async (req, res, next) => {
    try {
      const category = await CategoryService.getAll()
      res.status(200).json({ message: 'All Categories', category })
    } catch (error) {
      next(error)
    }
  }

  static create = async (req, res, next) => {
    try {
      const { name } = req.body
      const isCategoryExist = await CategoryService.findName(name)

      if (isCategoryExist) throw { name: 'Conflict' }
      if (!name) throw { name: 'BadRequest' }

      await CategoryService.create(name)
      res.status(201).json({ message: 'Category Created', name })
    } catch (error) {
      next(error)
    }
  }

  static update = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name } = req.body

      const findId = await CategoryService.findUnique(+id)

      if (!findId) throw { name: 'ErrorNotFound' }
      if (!name) throw { name: 'BadRequest' }

      await CategoryService.update(+id, name)
      res.status(200).json({ message: 'Category Updated', name })
    } catch (error) {
      next(error)
    }
  }

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const findId = await CategoryService.findUnique(+id)
      if (!findId) throw { name: 'ErrorNotFound' }

      await CategoryService.delete(+id)
      res.status(200).json({ message: `Category ${id} Deleted` })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController
