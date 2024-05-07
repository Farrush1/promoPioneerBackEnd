const CategoryService = require("../services/categoryService")

class CategoryController{
	static async getAll(req, res, next){
		try {
			const category = await CategoryService.getAll()
			res.status(200).json(category)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = CategoryController