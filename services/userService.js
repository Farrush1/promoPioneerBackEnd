const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')

class UserService {
  static async getAll () {
    try {
      const users = await prisma.user.findMany()
      return { users }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById (id) {
    try {
      const users = await prisma.user.findUnique({
        where: {
          id: +id
        }
      })
      return { users }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async setAddress (params) {
    try {
      const { body, cookie } = params
      const { fullAddress, cityId } = body
      const { id } = getDataUserCookie(cookie)
      const updateUser = await prisma.user.update({
        where: {
          id: +id
        },
        data: {
          full_address: fullAddress,
          city_id: +cityId
        },
        include: {
          UserCity: true
        }
      })
      return { updateUser }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = UserService
