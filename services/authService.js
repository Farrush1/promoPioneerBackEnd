const { hashPassword } = require('../libs/bcrypt')
const prisma = require('../libs/prisma')

class AuthService {
  static async register(params) {
    const { name, email, password, confirmPassword, affiliateCode } = params
    if (password !== confirmPassword) {
      const error = new Error('Passwords do not match')
      error.name = 'BadRequest'
      throw error
    }
    let withCode = false
    if (affiliateCode) {
      console.log(affiliateCode)
      withCode = true
    }
    const hPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hPassword,
        city,
      },
    })
  }
}

module.exports = AuthService
