const {
  getUniqueCityIds,
  createCheckoutCollection,
  createCheckouts,
  getCheckoutCollection,
  updateCheckouts
} = require('../helpers/checkoutHelpers')
const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')
const shippingCost = require('../utils/shippingCost')

// function getUniqueCityIds(cartItems) {
//   const uniqueCityIds = new Set()
//   cartItems.forEach((item) => uniqueCityIds.add(item.product.warehouse.city_id))
//   return [...uniqueCityIds]
// }

// async function createCheckoutCollection(userId) {
//   return await prisma.checkoutCollection.create({
//     data: { user_id: userId },
//   })
// }

// async function createCheckouts(uniqueCityIds, cartItems, checkCollectionId) {
//   for (const cityId of uniqueCityIds) {
//     console.log('Creating checkout for city ID:', cityId)

//     const checkout = await prisma.checkout.create({
//       data: {
//         checkout_collection_id: checkCollectionId,
//         status: 'incomplete',
//         city_id: cityId,
//       },
//     })

//     await createCheckoutItems(cartItems, checkout.id, cityId)
//     console.log('Finished checkout for city ID:', cityId)
//   }
// }

// async function createCheckoutItems(cartItems, checkoutId, cityId) {
//   for (const item of cartItems) {
//     if (item.product.warehouse.city_id === cityId) {
//       const {
//         product_id,
//         quantity,
//         product: { price },
//       } = item
//       const totalSpecificPrice = price * quantity

//       const checkoutItem = await prisma.checkoutItem.create({
//         data: {
//           checkout_id: checkoutId,
//           product_id,
//           quantity,
//           total_specific_price: totalSpecificPrice,
//         },
//       })

//       console.log('Created checkout item:', checkoutItem)
//     }
//   }
// }

// async function getCheckoutCollection(checkCollectionId) {
//   return await prisma.checkoutCollection.findUnique({
//     where: { id: checkCollectionId },
//     include: {
//       checkout: {
//         include: {
//           checkout_item: true,
//         },
//       },
//     },
//   })
// }
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
                  total_specific_price: totalPrice,
                  weight: totalWeight
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

  static async storeCart (params) {
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
                  warehouse: true
                }
              }
            }
          }
        }
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
      await updateCheckouts(newCheckColection)

      const upCheckColection = await getCheckoutCollection(checkColection.id)
      let totalItemPrice = 0
      upCheckColection.checkout.forEach((element) => {
        totalItemPrice += element.subtotal_price
      })

      await prisma.checkoutCollection.update({
        where: { id: checkColection.id },
        data: {
          total_item_price: totalItemPrice
        }
      })
      const lasCheckColection = await getCheckoutCollection(checkColection.id)

      return { lasCheckColection }
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
      // create discount checkout
      if (promo.PromoType.name === 'ALL_PRODUCT') {
        discountPrice = (totalItemPrice * promo.discount_percent) / 100
        totalItemPrice = totalItemPrice - discountPrice
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
        await prisma.checkoutCollection.update({
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
      } else if (promo.PromoType.name === 'SPECIFIC_PRODUCT') {
        console.log('beda')
      }
      const checkCollection = await prisma.checkoutCollection.findUnique({
        where: {
          id: +checkoutColectionId
        }
      })
      return { cheockoutColection: checkCollection }
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
