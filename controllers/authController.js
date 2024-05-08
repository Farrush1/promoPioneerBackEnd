const AuthService = require('../services/authService')

class AuthController {
  static async register () {
    try {
      const user = await AuthService.register(req.body)
    } catch (error) {

    }
  }
}

module.exports = AuthController
