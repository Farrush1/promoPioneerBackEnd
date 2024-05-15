const prisma = require('../libs/prisma')

class ProvinceService {
  static async getAll () {
    try {
      const province = await prisma.province.findMany({
        orderBy: [
          {
            id: 'asc'
          }
        ]
      })
      return { province }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ProvinceService
