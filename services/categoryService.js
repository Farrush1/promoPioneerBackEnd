class CategoryService{
	static async getAll(req, res, next){
		try {
			return {message: "get all category"}
		} catch (error) {
			throw error
		}
	}
}

module.exports = CategoryService