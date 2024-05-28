const cloudinaryUpload = require('../libs/cloudinary')
const prisma = require('../libs/prisma')
const getDataUserCookie = require('../utils/cookie')

class UserService {
  static async getAll () {
    try {
      const users = await prisma.user.findMany({
        include: {
          Cart: true,
          affiliate_code: true,
          UserCity: true
        }
      })
      return { users }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getAllOrderUser (params) {
    try {
      const { id } = params
      console.log(params)
      const checkoutCollection = await prisma.checkoutCollection.findMany({
        where: {
          user_id: id
        },
        include: {
          payment: true,
          CheckoutDiscount: true,
          checkout: {
            include: {
              city: true,
              checkout_item: {
                include: {
                  product: true
                }
              },
              shippingCheckout: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      return { checkoutCollection }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getById (id) {
    try {
      const users = await prisma.user.findUnique({
        where: {
          id: +id
        }
      })
      return { users }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getBio (params) {
    try {
      const user = getDataUserCookie(params)
      const { id } = user
      const users = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          affiliate_code: true
        }
      })
      return { users }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async updateBio (params) {
    try {
      const { cookie, body, file } = params
      const { name, userCityId, fullAddress, age, gender, phoneNumber } = body
      if (!userCityId || !fullAddress || !age || !gender || !phoneNumber || !name) {
        const error = new Error('field requied')
        error.name = 'BadRequest'
        throw error
      }
      const user = getDataUserCookie(cookie)
      const { id } = user
      const users = await prisma.user.findUnique({
        where: {
          id
        }
      })
      if (!users) {
        const error = new Error('user not found')
        error.name = 'ErrorNotFound'
      }
      if (!file) {
        const error = new Error('Insert photo avatar')
        error.name = 'BadRequest'
        throw error
      }
      const userAvatar = await cloudinaryUpload(file.path)
      const updateUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          city_id: +userCityId,
          full_address: fullAddress,
          age: +age,
          gender,
          avatar: userAvatar.url,
          phone_number: phoneNumber
        }
      })
      return { user: updateUser }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async setAddress (params) {
    try {
      const { body, cookie } = params
      const { fullAddress, cityId } = body
      const { id } = getDataUserCookie(cookie)
      const updateUser = await prisma.user.update({
        where: {
          id: +id
        },
        data: {
          full_address: fullAddress,
          city_id: +cityId
        },
        include: {
          UserCity: true
        }
      })
      return { updateUser }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = UserService
