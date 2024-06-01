const CartService = require('../services/cartService')

class CartController {
  static async getAll (req, res, next) {
    try {
      const carts = await CartService.getAll(req.cookies)
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  static async store (req, res, next) {
    try {
      const params = {
        cookie: req.cookies,
        body: req.body
      }
      const carts = await CartService.store(params)
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const params = {
        cookie: req.cookies,
        itemId: req.params.id,
        body: req.body
      }
      const carts = await CartService.update(params)
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  static async destroy (req, res, next) {
    try {
      const params = {
        cookie: req.cookies,
        itemId: req.params.id
      }
      const carts = await CartService.destroy(params)
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController
