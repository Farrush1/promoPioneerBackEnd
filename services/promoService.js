const prisma = require('../libs/prisma')

class PromoService {
  static async getAll () {
    try {
      const promo = await prisma.promo.findMany({
        include: {
          promoProduct: true
        }
      })
      return { promo }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store (params) {
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
          promo_type_id: promoTypeId
        },
        include: {
          PromoType: true
        }
      })
      return { promo }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async storeProductPromo (params) {
    try {
      const { body, productId } = params
      const { promoName } = body
      const product = await prisma.product.findUnique({
        where: {
          id: +productId
        }
      })
      if (!product) {
        const error = new Error('Product not Found')
        error.name = 'ErrorNotFound'
        throw error
      }
      const promo = await prisma.promo.findUnique({
        where: {
          name: promoName
        },
        include: {
          PromoType: true
        }
      })
      if (!promo) {
        const error = new Error('Promo not Found')
        error.name = 'ErrorNotFound'
        throw error
      }

      const promoProduct = await prisma.promoProduct.create({
        data: {
          product_id: +productId,
          promo_id: promo.id
        },
        include: {
          promo: true,
          Product: true
        }
      })

      return { promoProduct }
    } catch (error) {
      if (error.code === 'P2002') {
        const error = new Error('product already have this promo')
        error.name = 'Conflict'
        throw error
      }
      console.log(error)
      throw error
    }
  }
}

module.exports = PromoService
