const prisma = require('../libs/prisma')
const cloudinaryUpload = require('../libs/cloudinary')
class ProductService {
  static async getAllProducts(params) {
    try {
      let { page, limit, categories, search, minPrice, maxPrice, cities, specialPromo } = params

      page = parseInt(page) || 1
      limit = parseInt(limit) || 10

      if (page < 1 || limit < 1) {
        const error = new Error('Page and limit must bigger than 0.')
        error.name = 'ErrorNotFound'
        throw error
      }

// fix this
      // const filterOptions = {}

      // let price = {}
      // let minPrices = {}
      // let maxPrices = {}

      // if (minPrice) {
      //   minPrices = { gt: +minPrice }
      // }
      // if (maxPrice) {
      //   maxPrices = { lt: +maxPrice }
      // }

      // if (minPrice || maxPrice) {
      //   price = {
      //     price: {
      //       ...minPrices,
      //       ...maxPrices,
      //     },
      //   }
      // }

      // let searchFilter = {}

      // if (search) {
      //   searchFilter = {
      //     name: {
      //       contains: search,
      //       mode: 'insensitive',
      //     },
      //   }
      // }

      // let categoryFilter = {}

      // if (categories) {
      //   categoryFilter = {
      //     category: {
      //       id: +categories,
      //     },
      //   }
      // }
      // let cityFilter = {}

      // if (cities) {
      //   cityFilter = {
      //     warehouse: {
      //       city_id: +cities,
      //     },
      //   }
      // }

      // filterOptions.where = {
      //   ...categoryFilter,
      //   ...searchFilter,
      //   ...price,
      //   ...cityFilter,
      // }

      // const startIndex = (page - 1) * limit

      // filterOptions.take = limit
      // filterOptions.skip = startIndex

      // const products = await prisma.product.findMany({
      //   ...filterOptions,
      //   include: {
      //     warehouse: true,
      //   },
      // })
      const products = await prisma.product.findMany({
        where: {
          PromoProduct: {
            some: {
              promo: {
                PromoType: {
                  name: 'SPECIFIC_PRODUCT',
                },
              },
            },
          },
        },
        include: {
          PromoProduct: true
        },
      })

      return { products }
// fix this
      const filterOptions = {}

      let price = {}
      let minPrices = {}
      let maxPrices = {}

      if (minPrice) {
        minPrices = { gt: +minPrice }
      }
      if (maxPrice) {
        maxPrices = { lt: +maxPrice }
      }

      if (minPrice || maxPrice) {
        price = {
          price: {
            ...minPrices,
            ...maxPrices,
          },
        }
      }

      let searchFilter = {}

      if (search) {
        searchFilter = {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      }

      let categoryFilter = {}

      if (categories) {
        categoryFilter = {
          category: {
            id: +categories,
          },
        }
      }
      let cityFilter = {}

      if (cities) {
        cityFilter = {
          warehouse: {
            city_id: +cities,
          },
        }
      }

      filterOptions.where = {
        ...categoryFilter,
        ...searchFilter,
        ...price,
        ...cityFilter,
      }

      const startIndex = (page - 1) * limit

      filterOptions.take = limit
      filterOptions.skip = startIndex

      const products = await prisma.product.findMany({
        ...filterOptions,
        include: {
          warehouse: true,
        },
      })
      
      const totalProducts = await prisma.product.count({
        where: filterOptions.where,
      })


      // const totalProducts = await prisma.product.count({
      //   where: filterOptions.where,
      // })

      // const totalPages = Math.ceil(totalProducts / limit)
      // return { currentPage: page, totalPages, totalProducts, products }
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

  static async updateProduct(productId, params, res) {
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
      } = body || {}
      const object = {}
      if (categoryId) object.category_id = +categoryId
      if (warehouseName) object.warehouse_name = warehouseName
      if (warehouseFullAddress) object.warehouse_full_address = warehouseFullAddress
      if (warehouseCityId) object.warehouse_city_id = +warehouseCityId
      if (name) object.name = name
      if (description) object.description = description
      if (price) object.price = +price
      if (stock) object.stock = +stock
      if (weight) object.weight = +weight

      let productImage = null
      if (file) {
        productImage = await cloudinaryUpload(file.path)
        object.product_image = productImage.url
      }
      const result = await prisma.product.update({
        where: {
          id: +productId,
        },
        data: object,
      })
      res.status(200).json({ result, productImage })
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
