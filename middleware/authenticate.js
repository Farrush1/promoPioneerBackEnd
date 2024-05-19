const jwt = require('jsonwebtoken')

class AuthMiddleware {
  static async authenticate(req, res, next) {
    try {
      const token = req.cookies.accessToken

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' })
      }

      jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Unauthorized: Token is not valid' })
        }
        req.user = decoded 
        console.log(decoded)// Mengirimkan data pengguna yang terdekripsi ke request untuk digunakan di endpoint berikutnya
        next()
      })
    } catch (error) {
      next(error)
    }
  }

  static async authorization(req, res, next) {
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
