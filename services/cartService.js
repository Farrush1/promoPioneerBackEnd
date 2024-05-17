const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')

class CartService {
  static async getAll(params, headers) {
    try {
      const user = getDataUserCookie(params, headers)
      const { id } = user
      const carts = await prisma.cart.findUnique({
        where: {
          user_id: id,
        },
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
      return { carts }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store(params) {
    try {
      const { cookie, body } = params
      const { productId, quantity } = body
      const user = getDataUserCookie(cookie)
      const { id } = user
      const cart = await prisma.cart.findUnique({
        where: {
          user_id: id,
        },
      })
      const createItems = await prisma.cartItem.create({
        data: {
          quantity,
          product: {
            connect: {
              id: productId,
            },
          },
          cart: {
            connect: {
              id: cart.id,
            },
          },
        },
        include: {
          cart: true,
        },
      })
      console.log(createItems)
      return { createItems }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async destroy(params) {
    try {
      const { cookie, itemId } = params
      const user = getDataUserCookie(cookie)
      const { id } = user
      const cart = await prisma.cart.findUnique({
        where: {
          user_id: id,
        },
      })
      const deleteItems = await prisma.cartItem.delete({
        where: {
          id: +itemId,
          cart_id: cart.id,
        },
      })

      return { deleteItems }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = CartService
