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

  static async getById (req, res, next) {
    try {
      const { id } = req.params
      const payment = await PaymentService.getById(id)
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

  static async changeStatus (req, res, next) {
    try {
      const params = {
        paymentId: req.params.id,
        body: req.body
      }
      const payment = await PaymentService.changeStatus(params)
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
