const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductService {

  static async getAllProducts() { 
    try {
      return await prisma.product.findMany();
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getProductById(productId) {
    try {
      return await prisma.product.findUnique({
        where : {
          id : 1
        }
      });
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async createProduct(data) {
    try {
      return await prisma.product.create({data});
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async updateProduct(productById, data) {
    try {
      return await prisma.product.update({
        where :  {id :productId},
          data
      });
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async deleteProduct(productId) {
    try {
      return await prisma.product.delete({
        where :  {id :productId},
      });
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}


module.exports = ProductService
