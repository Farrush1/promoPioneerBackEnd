const prisma = require('../libs/prisma')
const jwt = require('jsonwebtoken')

class CheckoutService {
  static async getAll() {
    try {
      const checkout = await prisma.checkout.findMany()
      return { checkout }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store(params) {
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
      const token = cookie.accessToken
      console.log(token, '------------------')
      const { id } = jwt.verify(token, process.env.JWT_AUTH_SECRET)
      let subtotal_price = 0

      const product1 = await prisma.product.findFirst({
        where: {
          id: items[0].id
        },
        include:{
          warehouse: {
            include: {
              city: true
            }
          }
        }
      })

      // items.forEach((item) => {
      //   subtotal_price += item.quantity * item.product.price
        
      // })
      return {
        user_id: id,
        subtotal_price,
        shipping_id: null,
        total_shipping_price: null,
        status: 'incomplete',
        items,
        product1,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async cost(params) {
    try {
      const { origin, destination, weight, courier } = params
      const data = { origin, destination, weight, courier }
      const fetchCost = await fetch('https://api.rajaongkir.com/starter/cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: process.env.RAJAONGKIR_API_KEY,
        },
        body: JSON.stringify(data),
      })
      const response = await fetchCost.json()
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = CheckoutService
