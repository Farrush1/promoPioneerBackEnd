const express = require("express");
const router = express.Router()
const ProductController = require("../../controllers/productController");

router.get("/", ProductController.getAllProducts);
router.get("/", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/", ProductController.updateProduct);
router.delete("/", ProductController.deleteProduct);

module.exports = router
