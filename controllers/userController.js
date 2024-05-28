const UserService = require('../services/userService')

class userController {
  static async getAllOrderUser (req, res, next) {
    try {
      const user = await UserService.getAllOrderUser(req.user)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async getBio (req, res, next) {
    try {
      const user = await UserService.getBio(req.cookies)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async updateBio (req, res, next) {
    try {
      const params = {
        file: req.file,
        cookie: req.cookies,
        body: req.body
      }
      const user = await UserService.updateBio(params)
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
}

module.exports = userController
