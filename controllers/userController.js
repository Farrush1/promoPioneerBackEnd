const UserService = require('../services/userService')

class userController {
  static async getAll (req, res, next) {
    try {
      const user = await UserService.getAll()
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async getById (req, res, next) {
    try {
      const user = await UserService.getById(req.params.id)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async setAddress (req, res, next) {
    try {
      const params = {
        cookie: req.cookies,
        body: req.body
      }
      const user = await UserService.setAddress(params)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
