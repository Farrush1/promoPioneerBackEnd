const prisma = require('../libs/prisma')

class CityService {
  static async getAll () {
    try {
      const city = await prisma.city.findMany()
      return { city }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = CityService
