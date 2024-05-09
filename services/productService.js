const cloudinaryUpload = require('../libs/cloudinary')
const prisma = require('../libs/prisma')

class ProductService {
  static async getAllProducts() {
    try {
      const result = await prisma.product.findMany()
      return { result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getProductById(productId) {
    try {
      const result = await prisma.product.findUnique({
        where: {
          id: +productId,
        },
      })
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async updateProduct(productId, params) {
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
        weight,
      } = body
      let object = {}
      if (categoryId) object.category_id = +categoryId
      if (warehouseName) object.warehouse_name = warehouseName
      if (warehouseFullAddress) object.warehouse_full_address = warehouseFullAddress
      if (warehouseCityId) object.warehouse_city_id = +warehouseCityId
      if (name) object.name = name
      if (description) object.description = description
      if (price) object.price = +price
      if (stock) object.stock = +stock
      if (weight) object.weight = +weight

      const result = await prisma.product.update({
        where: {
          id: +productId,
        },
        data: object,
      })
      const productImage = await cloudinaryUpload(file.path)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async deleteProduct(productId) {
    try {
      const result = await prisma.product.delete({
        where: {
          id: +productId,
        },
      })
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async store(params) {
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
        weight,
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
                  id: +warehouseCityId,
                },
              },
            },
          },
          category: {
            connect: {
              id: +categoryId,
            },
          },
        },
        include: {
          warehouse: {
            include: {
              city: true,
            },
          },
          category: true,
        },
      })
      return { result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ProductService
