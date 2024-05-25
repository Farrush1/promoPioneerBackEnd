const jwt = require('jsonwebtoken')
const prisma = require('../libs/prisma')

class AuthMiddleware {
  static async authenticate (req, res, next) {
    try {
      const authHeader = req.headers['authorization']
      const token = req.cookies.accessToken || authHeader?.split(' ')[1]

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' })
      }

      const { id } = jwt.verify(token, process.env.JWT_AUTH_SECRET)

      const user = await prisma.user.findUnique({
        where: { id }
      })
      console.log(user)
      if (!user) {
        const error = new Error('InvalidCredential')
        error.name = 'InvalidCredential'
        throw error
      }
      req.user = {
        id: user.id,
        role: user.role,
      }
      next()

      // jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
      //   if (err) {
      //     return res.status(403).json({ error: 'Unauthorized: Token is not valid' })
      //   }
      //   req.user = decoded
      //   console.log(decoded)// Mengirimkan data pengguna yang terdekripsi ke request untuk digunakan di endpoint berikutnya
      //   next()
      // })
    } catch (error) {
      next(error)
    }
  }

  static async authorization (req, res, next) {
    try {
      const { role } = req.user

      if (role === 'ADMIN') {
        next()
      } else {
        const error = new Error('InvalidCredential')
        error.name = 'InvalidCredential'
        throw error
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthMiddleware
