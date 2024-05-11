const { hashPassword, comparePassword } = require('../libs/bcrypt')
const sign = require('../libs/jwt')
const prisma = require('../libs/prisma')
const generateAffiliateCode = require('../utils/affiliateCode')

class AuthService {
  static async register (params) {
    try {
      const { name, email, password, confirmPassword, affiliateCode } = params
      if (!name || !email || !password || !confirmPassword) {
        const error = new Error('field must be filled')
        error.name = 'BadRequest'
        throw error
      }
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
      const userAffiliate = generateAffiliateCode()
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hPassword,
          is_register_using_code: withCode,
          is_first_transaction: false,
          affiliate_code: {
            create: {
              affiliate_code: userAffiliate
            }
          }
        },
        include: {
          affiliate_code: true

        }
      })
      await prisma.cart.create({
        data: {
          user_id: user.id
        }
      })
      return { user }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async login (params, res) {
    try {
      const { email, password } = params

      if (!email || !password) {
        const error = new Error('field must be filled')
        error.name = 'BadRequest'
        throw error
      }
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (!user) {
        const error = new Error('InvalidCredential')
        error.name = 'InvalidCredential'
        throw error
      }
      const comPassword = await comparePassword(password, user.password)
      if (!comPassword) {
        const error = new Error('Password not match')
        error.name = 'InvalidCredential'
        throw error
      }
      const token = sign({ id: user.id, role: user.role })
      res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true
      })
      return { message: 'success login', accessToken: token }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = AuthService
