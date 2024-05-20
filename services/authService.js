const { hashPassword, comparePassword } = require('../libs/bcrypt')
const { sign, verify } = require('../libs/jwt')
const prisma = require('../libs/prisma')
const generateAffiliateCode = require('../utils/affiliateCode')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2981300bb65bf5',
    pass: 'dda4934c6992dd',
  },
})

class AuthService {
  static async register(params) {
    try {
      const { name, email, password, confirmPassword, affiliateCode } = params
      this.validateRegistrationParams(name, email, password, confirmPassword)

      let withCode = false
      if (affiliateCode) {
        const checkAffiliate = await prisma.affiliateCode.findUnique({
          where: {
            affiliate_code: affiliateCode,
          },
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
          is_first_transaction: true,
          affiliate_code: {
            create: {
              affiliate_code: userAffiliate,
            },
          },
        },

        include: {
          affiliate_code: true,
        },
      })
      await prisma.cart.create({
        data: {
          user_id: user.id,
        },
      })
      return { user }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async login(params, res) {
    try {
      const { email, password } = params
      this.validateLoginParams(email, password)

      const user = await prisma.user.findUnique({
        where: { email },
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
      })

      return { message: 'success login', role: user.role }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async forgotPassword(params) {
    try {
      const { email } = params
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })
      if (!user) {
        const error = new Error('Email not Found!')
        error.name = 'ErrorNotFound'
        throw error
      }

      const token = sign({ id: user.id }, '1h')
      const resetLink = `http://localhost:3000/reset-password?token=${token}` // nextjs route

      const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .header img {
                width: 100px;
            }
            .content {
                text-align: center;
                padding: 20px;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                color: #999999;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="your-logo-url-here" alt="Promo Pioneer">
            </div>
            <div class="content">
                <h1>Reset Your Password</h1>
                <p>${token}</p>
                <p>We received a request to reset your password. Click the button below to reset it.</p>
                <a href="${resetLink}" class="button">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>© 2024 promo pioneer. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `
      await transport.sendMail({
        from: 'thepioneerpromo@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        html,
      })

      return { message: 'Password reset email sent' }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async resetPassword(params) {
    try {
      const { token, newPassword } = params
      const { id } = verify(token)

      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        const error = new Error('InvalidCredential')
        error.name = 'InvalidCredential'
        throw error
      }

      const hashedPassword = hashPassword(newPassword)
      const newUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      })
      return { message: 'Password has been reset', newUser }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie('accessToken')
      return { message: 'success logout' }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static validateRegistrationParams(name, email, password, confirmPassword) {
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

  static validateLoginParams(email, password) {
    if (!email || !password) {
      const error = new Error('Field must be filled')
      error.name = 'BadRequest'
      throw error
    }
  }

  static validateUserCredentials(user) {
    if (!user) {
      const error = new Error('Invalid credentials')
      error.name = 'InvalidCredential'
      throw error
    }
  }
}

module.exports = AuthService
