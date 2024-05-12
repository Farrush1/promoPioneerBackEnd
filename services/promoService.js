const prisma = require('../libs/prisma')

class PromoService {
  static async getAll() {
    try {
      const promo = await prisma.promo.findMany()
      return { promo }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store(params) {
    const { name, discountPercent, quantity, isLimited, startDate, endDate, promoTypeId } = params
    try {
      const promo = await prisma.promo.create({
        data: {
          name,
          discount_percent: discountPercent,
          quantity,
          isLimited,
          start_date: startDate,
          end_date: endDate,
          promo_type_id: promoTypeId,
        },
        include: {
          PromoType: true,
        },
      })
      return { promo }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = PromoService
