const prisma = require('../libs/prisma')

class CategoryService {
  static getAll = async () => {
    try {
      const category = await prisma.category.findMany()
      return category
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static create = async (params) => {
    try {
      await prisma.category.create({ data: { name: params } })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static update = async (id, name) => {
    try {
      await prisma.category.update({ where: { id }, data: { name } })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static findName = async (params) => {
    try {
      const findName = await prisma.category.findFirst({ where: { name: params } })
      return findName
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static findUnique = async (id) => {
    try {
      const findId = await prisma.category.findUnique({ where: { id } })
      return findId
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }

  static delete = async (id) => {
    try {
      const deleteById = await prisma.category.delete({ where: { id } })
      return deleteById
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }
}

module.exports = CategoryService
