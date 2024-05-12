const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')
const shippingCost = require('../utils/shippingCost')

class CheckoutService {
  static async getAll () {
    try {
      const checkout = await prisma.checkoutCollection.findMany({
        include: {
          checkout: {
            include: {
              checkout_item: true
            }
          }
        }
      })
      return { checkout }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById (params) {
    const { checkoutColectionId, cookie } = params
    const user = getDataUserCookie(cookie)
    const { id } = user
    const userData = await prisma.user.findUnique({
      where: {
        id
      }
    })
    const userCity = userData.city_id
    if (!userCity) {
      const error = new Error('user must have address')
      error.name = 'BadRequest'
      throw error
    }
    try {
      const checkoutColection = await prisma.checkoutCollection.findUnique({
        where: {
          id: +checkoutColectionId
        },
        include: {
          CheckoutDiscount: true,
          checkout: {
            include: {
              checkout_item: true
            }
          }
        }
      })
      // const checkouts = checkoutColection.checkout
      for (const checkout of checkoutColection.checkout) {
        console.log(checkout)
        const shippingJNE = await shippingCost(
          checkout.city_id,
          userCity,
          checkout.total_weight,
          'jne'
        )
        const shippingTIKI = await shippingCost(
          checkout.city_id,
          userCity,
          checkout.total_weight,
          'tiki'
        )
        const shippingPOS = await shippingCost(
          checkout.city_id,
          userCity,
          checkout.total_weight,
          'pos'
        )
        checkout.shipping_option = [shippingJNE[0], shippingTIKI[0], shippingPOS[0]]
      }
      return { checkoutColection }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async storeProduct (params) {
    try {
      const { body, cookie, productId } = params
      const { quantity } = body
      const { id } = getDataUserCookie(cookie)
      const user = await prisma.user.findUnique({
        where: { id }
      })
      const product = await prisma.product.findUnique({
        where: { id: +productId },
        include: {
          warehouse: true
        }
      })
      if (!user.full_address || !user.city_id) {
        const error = new Error('user address and city required')
        error.name = 'BadRequest'
        throw error
      }
      const totalPrice = product.price * quantity
      const totalWeight = product.weight * quantity
      const checkoutColection = await prisma.checkoutCollection.create({
        data: {
          user_id: id,
          total_item_price: totalPrice,
          checkout: {
            create: {
              subtotal_price: totalPrice,
              total_weight: totalWeight,
              city_id: product.warehouse.city_id,
              status: 'incompleted',
              checkout_item: {
                create: {
                  product_id: +productId,
                  quantity,
                  total_specific_price: totalPrice
                }
              }
            }
          }
        }
      })
      return { checkoutColection }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async promoCheckout (params) {
    try {
      const { body, checkoutColectionId } = params
      const { codeVoucher } = body
      const checkoutColection = await prisma.checkoutCollection.findUnique({
        where: {
          id: +checkoutColectionId
        },
        include: {
          checkout: true
        }
      })
      const promo = await prisma.promo.findUnique({
        where: {
          name: codeVoucher
        },
        include: {
          PromoType: true
        }
      })
      if (!promo) {
        const error = new Error('voucher promo not found')
        error.name = 'ErrorNotFound'
        throw error
      }
      let discountPrice = 0
      let totalItemPrice = checkoutColection.total_item_price
      if (promo.PromoType.name === 'ALL_PRODUCT') {
        discountPrice = totalItemPrice * promo.discount_percent / 100
        totalItemPrice = totalItemPrice - discountPrice
      }
      await prisma.checkoutDiscount.create({
        data: {
          discount_price: discountPrice,
          discount_percent: promo.discount_percent,
          checkout_collection: {
            connect: { id: +checkoutColectionId }
          },
          promo: {
            connect: { id: +promo.id }
          }
        }
      })
      const updateCheckoutCollection = await prisma.checkoutCollection.update({
        where: {
          id: +checkoutColectionId
        },
        data: {
          total_item_price: totalItemPrice
        },
        include: {
          checkout: true,
          CheckoutDiscount: true
        }
      })
      return { updateCheckoutCollection }
    } catch (error) {
      if (error.code === 'P2002') {
        const error = new Error('promo already input')
        error.name = 'Conflict'
        throw error
      }
      console.log(error)
      throw error
    }
  }
}

module.exports = CheckoutService
