const {
  getUniqueCityIds,
  createCheckoutCollection,
  createCheckouts,
  getCheckoutCollection,
  updateCheckouts,
} = require('../helpers/checkoutHelpers')
const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')
// const shippingCost = require('../utils/shippingCost')

class CheckoutService {
  static async getAll() {
    try {
      const checkout = await prisma.checkoutCollection.findMany({
        include: {
          CheckoutDiscount: true,
          checkout: {
            include: {
              checkout_item: true,
              shippingCheckout: true,
            },
          },
        },
      })
      return { checkout }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById(params) {
    const { checkoutColectionId, user } = params
    const { id } = user
    const userData = await prisma.user.findUnique({
      where: {
        id,
      },
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
          id: +checkoutColectionId,
        },
        include: {
          CheckoutDiscount: true,
          checkout: {
            include: {
              checkout_item: true,
              shippingCheckout: true,
            },
          },
        },
      })

      await updateCheckouts(checkoutColection, userCity)

      const getCheckCollection = await getCheckoutCollection(checkoutColection.id)

      let totalItemPrice = 0
      let totalShippingPrice = 0
      getCheckCollection.checkout.forEach((element) => {
        totalItemPrice += element.subtotal_price
        totalShippingPrice += element.shippingCheckout.price
      })
      getCheckCollection.CheckoutDiscount.forEach((element) => {
        totalItemPrice -= element.discount_price
      })
      const totalPrice = totalItemPrice + totalShippingPrice

      await prisma.checkoutCollection.update({
        where: { id: getCheckCollection.id },
        data: {
          total_price: totalPrice,
          total_item_price: totalItemPrice,
          total_shipping_price: totalShippingPrice,
        },
      })
      const secondCheckCollection = await getCheckoutCollection(checkoutColection.id)

      return { getCheckCollection: secondCheckCollection }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async storeProduct(params) {
    try {
      const { body, cookie, productId } = params
      const { quantity } = body
      const { id } = getDataUserCookie(cookie)
      const user = await prisma.user.findUnique({
        where: { id },
      })
      const product = await prisma.product.findUnique({
        where: { id: +productId },
        include: {
          warehouse: true,
        },
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
                  total_specific_price: totalPrice,
                  weight: totalWeight,
                },
              },
            },
          },
        },
      })
      return { checkoutColection }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async storeCart(params) {
    try {
      const { cookie } = params
      const { id } = getDataUserCookie(cookie)

      const user = await prisma.user.findUnique({ where: { id } })
      if (!user) {
        throw new Error('User not found')
      }

      const cart = await prisma.cart.findUnique({
        where: { user_id: user.id },
        include: {
          cartItem: {
            include: {
              product: {
                include: {
                  warehouse: true,
                },
              },
            },
          },
        },
      })

      if (!cart) {
        const error = new Error('Cart not found')
        error.name = 'ErrorNotFound'
        throw error
      }

      const uniqueCityIds = getUniqueCityIds(cart.cartItem)

      const checkColection = await createCheckoutCollection(id)

      await createCheckouts(uniqueCityIds, cart.cartItem, checkColection.id)

      const newCheckColection = await getCheckoutCollection(checkColection.id)

      // new code
      await updateCheckouts(newCheckColection, user.city_id)

      const upCheckColection = await getCheckoutCollection(checkColection.id)
      let totalItemPrice = 0
      upCheckColection.checkout.forEach((element) => {
        totalItemPrice += element.subtotal_price
      })

      let discount = 0

      if (user.is_register_using_code && !user.is_first_transaction) {
        console.log('first')
        discount = (50 * totalItemPrice) / 100
        await prisma.checkoutDiscount.create({
          data: {
            checkout_colection_id: checkColection.id,
            promo_id: 1,
            discount_percent: 50,
            discount_price: discount,
          },
        })
      }

      totalItemPrice -= discount
      await prisma.checkoutCollection.update({
        where: { id: checkColection.id },
        data: {
          total_item_price: totalItemPrice,
        },
      })
      const lasCheckColection = await getCheckoutCollection(checkColection.id)

      return { lasCheckColection }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async promoCheckout(params) {
    try {
      const { body, checkoutColectionId } = params
      const { codeVoucher } = body
      const promo = await prisma.promo.findUnique({
        where: {
          name: codeVoucher,
        },
        include: {
          PromoType: true,
          promoProduct: true,
        },
      })
      if (!promo) {
        const error = new Error('voucher promo not found')
        error.name = 'ErrorNotFound'
        throw error
      }

      let totalDiscount = 0
      let totalQuantity = 0
      if (promo.PromoType.name === 'SPECIFIC_PRODUCT') {
        const chekoutItems = await prisma.checkoutItem.findMany({
          where: {
            checkout: {
              checkout_collection: {
                id: +checkoutColectionId,
              },
            },
            product: {
              PromoProduct: {
                some: {
                  promo: {
                    name: codeVoucher,
                  },
                },
              },
            },
          },
          include: {
            product: {
              include: {
                PromoProduct: true,
              },
            },
          },
        })
        for (const checkItem of chekoutItems) {
          const discount = (promo.discount_percent * checkItem.total_specific_price) / 100
          await prisma.checkoutItem.update({
            where: {
              id: checkItem.id,
            },
            data: {
              total_specific_price: checkItem.total_specific_price - discount,
            },
          })
          totalQuantity += checkItem.quantity
          totalDiscount = totalDiscount + discount
        }
      } else if (promo.PromoType.name === 'ALL_PRODUCT') {
        const chekoutItems = await prisma.checkoutItem.findMany({
          where: {
            checkout: {
              checkout_collection: {
                id: +checkoutColectionId,
              },
            },
          },
        })
        for (const checkItem of chekoutItems) {
          const discount = (promo.discount_percent * checkItem.total_specific_price) / 100
          await prisma.checkoutItem.update({
            where: {
              id: checkItem.id,
            },
            data: {
              total_specific_price: checkItem.total_specific_price - discount,
            },
          })
          totalQuantity += checkItem.quantity
          totalDiscount = totalDiscount + discount
        }
      }
      await prisma.checkoutDiscount.create({
        data: {
          discount_price: totalDiscount,
          discount_percent: promo.discount_percent,
          total_quantity: totalQuantity,
          checkout_collection: {
            connect: { id: +checkoutColectionId },
          },
          promo: {
            connect: { id: +promo.id },
          },
        },
      })
      return { message: 'success add discount' }
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
