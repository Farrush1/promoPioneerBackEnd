const { hashPassword, comparePassword } = require('../libs/bcrypt')
const { sign } = require('../libs/jwt')
const prisma = require('../libs/prisma')
const generateAffiliateCode = require('../utils/affiliateCode')

class AuthService {
  static async register (params) {
    try {
      const { name, email, password, confirmPassword, affiliateCode } = params
      this.validateRegistrationParams(name, email, password, confirmPassword)

      let withCode = false
      if (affiliateCode) {
        const checkAffiliate = await prisma.affiliateCode.findUnique({
          where: {
            affiliate_code: affiliateCode
          }
        })
        if (!checkAffiliate) {
          const error = new Error('wrong affiliate code')
          error.name = 'BadRequest'
          throw error
        }
        withCode = true
      }
      const userAffiliate = generateAffiliateCode()

      const hashedPassword = await hashPassword(password)
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
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
      this.validateLoginParams(email, password)

      const user = await prisma.user.findUnique({
        where: { email }
      })

      this.validateUserCredentials(user)

      const token = sign({ id: user.id, role: user.role })

      const comPassword = await comparePassword(password, user.password)
      if (!comPassword) {
        const error = new Error('Password not match')
        error.name = 'InvalidCredential'
        throw error
      }

      res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: true
      })

      return { message: 'success login' }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async logout (req, res) {
    try {
      res.clearCookie('accessToken')
      return { message: 'success logout' }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static validateRegistrationParams (name, email, password, confirmPassword) {
    if (!name || !email || !password || !confirmPassword) {
      const error = new Error('Field must be filled')
      error.name = 'BadRequest'
      throw error
    }
    if (password !== confirmPassword) {
      const error = new Error('Passwords do not match')
      error.name = 'BadRequest'
      throw error
    }
  }

  static validateLoginParams (email, password) {
    if (!email || !password) {
      const error = new Error('Field must be filled')
      error.name = 'BadRequest'
      throw error
    }
  }

  static validateUserCredentials (user) {
    if (!user) {
      const error = new Error('Invalid credentials')
      error.name = 'InvalidCredential'
      throw error
    }
  }
}

module.exports = AuthService
