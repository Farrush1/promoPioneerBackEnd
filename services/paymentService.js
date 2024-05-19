const cloudinaryUpload = require('../libs/cloudinary')
const prisma = require('../libs/prisma')

class PaymentService {
  static async getAll() {
    try {
      const payment = await prisma.payment.findMany()
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById(id) {
    try {
      const payment = await prisma.payment.findUnique({
        where: {
          id: +id,
        },
        include: {
          checkout_colection: {
            include: {
              checkout: {
                include: {
                  checkout_item: {
                    include: {
                      product: true,
                    },
                  },
                },
              },
              CheckoutDiscount: true,
            },
          },
        },
      })
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store(params) {
    try {
      const { checkoutColectionId } = params
      const checkoutColection = await prisma.checkoutCollection.findUnique({
        where: { id: checkoutColectionId },
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
          payment_status: 'PENDING',
        },
      })
      return { payment }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async uploadProof(params) {
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
          id: +paymentId,
        },
        data: {
          payment_proof: paymentProof.url,
          payment_status: 'WAITING',
        },
      })
      return { payment, paymentProof }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = PaymentService
