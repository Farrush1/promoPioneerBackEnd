const PaymentService = require('../services/paymentService')

class PaymentController {
  static async getAll (req, res, next) {
    try {
      const payment = await PaymentService.getAll()
      res.status(200).json(payment)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const payment = await PaymentService.store(req.body)
      res.status(200).json(payment)
    } catch (error) {
      next(error)
    }
  }

  static async uploadProof (req, res, next) {
    try {
      const params = {
        paymentId: req.params.id,
        file: req.file
      }
      const payment = await PaymentService.uploadProof(params)
      res.status(200).json(payment)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PaymentController
