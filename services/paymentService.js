const cloudinaryUpload = require('../libs/cloudinary')
const prisma = require('../libs/prisma')

class PaymentService {
  static async getAll () {
    try {
      const payment = await prisma.payment.findMany()
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async changeStatus (params) {
    try {
      const { paymentId, body } = params
      const { paymentStatus } = body
      const payment = await prisma.payment.update({
        where: {
          id: +paymentId
        },
        data: {
          payment_status: paymentStatus
        },
        include: {
          checkout_colection: {
            include: {
              user: true
            }
          }
        }
      })
      const user = payment.checkout_colection.user
      if (user.is_register_using_code && user.is_first_transaction && paymentStatus === 'SUCCESS') {
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            is_first_transaction: false
          }
        })
      }
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById (id) {
    try {
      const payment = await prisma.payment.findUnique({
        where: {
          id: +id
        },
        include: {
          checkout_colection: {
            include: {
              checkout: {
                include: {
                  shippingCheckout: true,
                  checkout_item: {
                    include: {
                      product: true
                    }
                  }
                }
              },
              CheckoutDiscount: true
            }
          }
        }
      })
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store (params) {
    try {
      const { checkoutColectionId } = params
      const checkoutColection = await prisma.checkoutCollection.findUnique({
        where: { id: checkoutColectionId }
      })
      if (!checkoutColection) {
        const error = new Error('checkout colection not found')
        error.name = 'ErrorNotFound'
        throw error
      }
      if (!checkoutColection.total_shipping_price || !checkoutColection.total_price) {
        const error = new Error('please, finish your checkout')
        error.name = 'BadRequest'
        throw error
      }
      const payment = await prisma.payment.create({
        data: {
          checkout_collection_id: checkoutColectionId,
          payment_status: 'PENDING'
        },
        include: {
          checkout_colection: true
        }

      })
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async uploadProof (params) {
    try {
      const { paymentId, file } = params
      if (!file) {
        const error = new Error('Insert payment proof')
        error.name = 'BadRequest'
        throw error
      }
      const paymentProof = await cloudinaryUpload(file.path)
      const payment = await prisma.payment.update({
        where: {
          id: +paymentId
        },
        data: {
          payment_proof: paymentProof.url,
          payment_status: 'WAITING'
        }
      })
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = PaymentService
