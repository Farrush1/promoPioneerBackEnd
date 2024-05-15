const prisma = require('../libs/prisma')

class WarehouseService {
  static async getAll () {
    try {
      const warehouse = await prisma.wareHouse.findMany({
        include: {
          city: true
        }
      })
      return { warehouse }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = WarehouseService
