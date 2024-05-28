const {
  getUniqueCityIds,
  createCheckoutCollection,
  createCheckouts,
  getCheckoutCollection,
  updateCheckouts,
  firstShip,
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
        orderBy:{
          updatedAt: 'desc'
        }
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
              checkout_item: {
                include: {
                  product: true,
                },
              },
              shippingCheckout: true,
            },
          },
        },
      })
      return { getCheckCollection: checkoutColection }
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

      const ship = await firstShip(product.warehouse.city_id, user.city_id, totalWeight)
      const { code, service, cost } = ship.firstShiping
      const checkoutColection = await prisma.checkoutCollection.create({
        data: {
          user_id: id,
          total_shipping_price: cost,
          total_item_price: totalPrice,
          total_price: totalPrice + cost,
          status: 'UNCOMPLETED',
          checkout: {
            create: {
              subtotal_price: totalPrice,
              total_weight: totalWeight,
              city_id: product.warehouse.city_id,
              checkout_item: {
                create: {
                  product_id: +productId,
                  quantity,
                  total_specific_price: totalPrice,
                  original_price: totalPrice,
                  weight: totalWeight,
                },
              },
              shippingCheckout: {
                create: {
                  name: code,
                  service,
                  price: cost,
                },
              },
            },
          },
        },
      })
      let discount = 0

      if (user.is_register_using_code && user.is_first_transaction) {
        discount = (50 * checkoutColection.total_item_price) / 100
        await prisma.checkoutDiscount.create({
          data: {
            checkout_colection_id: checkoutColection.id,
            promo_id: 1,
            discount_percent: 50,
            total_quantity: 1,
            discount_price: discount,
          },
        })
        const totalItemPrice = checkoutColection.total_item_price - discount
        const checkoutColections = await prisma.checkoutCollection.update({
          where: {
            id: checkoutColection.id,
          },
          data: {
            total_item_price: totalItemPrice,
            total_price: totalItemPrice + checkoutColection.total_shipping_price,
          },
          include: {
            checkout: true,
          },
        })
        const checkout = await prisma.checkout.update({
          where: {
            id: checkoutColections.checkout[0].id,
          },
          data: {
            subtotal_price: totalItemPrice,
            total_checkout_price: totalItemPrice + checkoutColection.total_shipping_price,
          },
          include: {
            checkout_item: true,
          },
        })

        await prisma.checkoutItem.update({
          where: {
            id: checkout.checkout_item[0].id,
          },
          data: {
            total_specific_price: totalItemPrice,
          },
        })
      }

      const chekColectionId = await prisma.checkoutCollection.findUnique({
        where: {
          id: checkoutColection.id,
        },
        include: {
          CheckoutDiscount: true,
          checkout: {
            include: {
              checkout_item: {
                include: {
                  product: true,
                },
              },
              shippingCheckout: true,
            },
          },
        },
      })

      return { checkoutColection: chekColectionId }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async storeCart(id) {
    try {
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

      let totalDiscountPrice = 0
      if (user.is_register_using_code && user.is_first_transaction) {
        const chekoutItems = await prisma.checkoutItem.findMany({
          where: {
            checkout: {
              checkout_collection: {
                id: checkColection.id,
              },
            },
          },
        })
        // checkout item
        for (const checkItem of chekoutItems) {
          const discount = (50 * checkItem.total_specific_price) / 100
          await prisma.checkoutItem.update({
            where: {
              id: checkItem.id,
            },
            data: {
              total_specific_price: checkItem.total_specific_price - discount,
            },
          })
          totalDiscountPrice = totalDiscountPrice + discount
        }

        const checkouts = await prisma.checkout.findMany({
          where: {
            checkout_collection_id: checkColection.id,
          },
          include: {
            checkout_item: true,
            shippingCheckout: true
          },
        })

        for (const checks of checkouts) {
          let subtotal_price = 0
          for (const item of checks.checkout_item) {
            subtotal_price += item.total_specific_price
          }
          await prisma.checkout.update({
            where: {
              id: checks.id,
            },
            data: {
              subtotal_price,
              total_checkout_price: subtotal_price + checks.shippingCheckout.price,
            },
          })
        }

        await prisma.checkoutDiscount.create({
          data: {
            discount_price: totalDiscountPrice,
            discount_percent: 50,
            total_quantity: 1,
            checkout_collection: {
              connect: { id: checkColection.id },
            },
            promo: {
              connect: { id: 1 },
            },
          },
        })
      }
      const ship = await prisma.shippingCheckout.findMany({
        where: {
          checkout: {
            checkout_collection: {
              id: checkColection.id,
            },
          },
        },
      })
      let totalShipPrice = 0
      ship.forEach((shipCheck) => {
        totalShipPrice += shipCheck.price
      })

      totalItemPrice -= totalDiscountPrice
      await prisma.checkoutCollection.update({
        where: { id: checkColection.id },
        data: {
          total_item_price: totalItemPrice,
          total_shipping_price: totalShipPrice,
          total_price: totalItemPrice + totalShipPrice,
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
      const checkColection = await getCheckoutCollection(+checkoutColectionId)

      let totalItemPrice = 0
      for (const checkout of checkColection.checkout) {
        let subTotalPrice = 0

        checkout.checkout_item.forEach((item) => {
          subTotalPrice += item.total_specific_price
        })

        const totalCheckPrice = subTotalPrice + checkout.shippingCheckout.price

        await prisma.checkout.update({
          where: { id: checkout.id },
          data: {
            total_checkout_price: totalCheckPrice,
            subtotal_price: subTotalPrice,
          },
        })
        totalItemPrice += subTotalPrice
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

      await prisma.checkoutCollection.update({
        where: { id: checkColection.id },
        data: {
          total_item_price: totalItemPrice,
          total_price: totalItemPrice + checkColection.total_shipping_price,
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
