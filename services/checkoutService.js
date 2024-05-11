const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')
const shippingCost = require('../utils/shippingCost')

class CheckoutService {
  static async getAll () {
    try {
      const checkout = await prisma.checkout.findMany({
        include: {
          checkout_item: {
            include: {
              product: true
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

  static async storeProduct (params) {
    try {
      const { body, cookie, productid } = params
      const { items } = body
      const { id } = getDataUserCookie(cookie)
      const user = await prisma.user.findUnique({
        where: { id }
      })
      return { user }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async create (params) {
    try {
      // belum order status incomplete, sudah order status pending, sudah payment status waiting

      // user is dari cookies
      // subtotal price itu jumlah total price product
      // status incomplete

      // shipping_id di optional
      // total shipping price di opsional
      // total price di optional

      // checkout_item itu product_id, quantity, shipping option
      // shipping_option field is name, service, price
      const { body, cookie } = params
      const { items } = body
      const { id } = getDataUserCookie(cookie)
      const user = await prisma.user.findUnique({
        where: {
          id: +id
        },
        include: {
          UserCity: true
        }
      })

      const userCityId = user.city_id
      let subtotalPrice = 0
      const products = []

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: {
            id: item.product_id
          },
          include: {
            warehouse: {
              include: {
                city: true
              }
            }
          }
        })

        if (!product) {
          throw new Error(`Product with ID ${item.product_id} not found`)
        }

        const totalWeight = product.weight * item.quantity // Hitung total berat untuk produk
        subtotalPrice += item.quantity * product.price

        const shippingJNE = await shippingCost(
          product.warehouse.city_id,
          userCityId,
          totalWeight,
          'jne'
        )
        const shippingTIKI = await shippingCost(
          product.warehouse.city_id,
          userCityId,
          totalWeight,
          'tiki'
        )
        const shippingPOS = await shippingCost(
          product.warehouse.city_id,
          userCityId,
          totalWeight,
          'pos'
        )

        products.push({
          ...product,
          totalWeight,
          quantity: item.quantity,
          shippingOption: [shippingJNE[0], shippingTIKI[0], shippingPOS[0]]
        }) // Tambahkan total berat ke dalam data produk
      }

      // items.forEach((item) => {
      //   subtotalPrice += item.quantity * item.product.price

      // })
      return {
        user_id: id,
        subtotalPrice,
        shipping_id: null,
        total_shipping_price: null,
        status: 'incomplete',
        items,
        products
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = CheckoutService
