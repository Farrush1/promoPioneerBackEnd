const prisma = require('../libs/prisma')

class CheckoutColectionController {
  static async getAll (req, res, next) {
    try {
      const checkout = await prisma.checkoutCollection.findUnique({
        where: { id: 4 },
        include: {
          checkout: {
            include: {
              checkout_item: true
            }
          }
        }
      })
      res.status(200).json(checkout)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CheckoutColectionController
