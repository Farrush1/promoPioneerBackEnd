const AuthService = require('../services/authService')

class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const user = await AuthService.login(req.body, res)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const user = await AuthService.forgotPassword(req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const user = await AuthService.resetPassword(req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async logout(req, res, next) {
    try {
      const user = await AuthService.logout(req, res)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
