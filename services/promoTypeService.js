const prisma = require('../libs/prisma')

class PromoTypeService {
  static getAll = async () => {
    try {
      const promoType = await prisma.promoType.findMany()
      return { promoType }
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  static getPromoByPromotype = async (id) => {
    try {
      const promoType = await prisma.promoType.findUnique({
        where: {
          id: +id
        },
        include: {
          promo: true
        }
      })
      return { promoType }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

}

module.exports = PromoTypeService
