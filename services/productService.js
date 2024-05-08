class ProductService {
  static async getAll () {
    try {
      return { message: 'success get all' }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = ProductService
