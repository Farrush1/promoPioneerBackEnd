
const express = require('express')
const ProductController = require('../../controllers/productController')
const upload = require('../../middleware/multer')
const router = express.Router()

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

router.post('/', upload.single('product_image'), ProductController.store)
router.post('/upload', upload.single('image'), ProductController.upload)

module.exports = router
