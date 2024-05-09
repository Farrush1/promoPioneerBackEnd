const cloudinaryUpload = require('../libs/cloudinary')
const prisma = require('../libs/prisma')

class ProductService {
  static async getAll () {
    try {
      const result = await prisma.product.findMany()
      return { result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store (params) {
    try {
      const { body, file } = params
      const {
        categoryId,
        warehouseName,
        warehouseFullAddress,
        warehouseCityId,
        name,
        description,
        price,
        stock,
        weight
      } = body
      if (!file) {
        const error = new Error('Insert photo product')
        error.name = 'BadRequest'
        throw error
      }
      const productImage = await cloudinaryUpload(file.path)

      const result = await prisma.product.create({
        data: {
          name,
          description,
          price: +price,
          stock: +stock,
          weight: +weight,
          product_image: productImage.url,
          warehouse: {
            create: {
              name: warehouseName,
              location: warehouseFullAddress,
              city: {
                connect: {
                  id: +warehouseCityId
                }
              }
            }
          },
          category: {
            connect: {
              id: +categoryId
            }
          }
        },
        include: {
          warehouse: {
            include: {
              city: true
            }
          },
          category: true
        }
      })
      return { result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ProductService
