const express = require('express')
const ProvinceController = require('../../controllers/provinceController')
const router = express.Router()

router.get('/', ProvinceController.getAll)

module.exports = router
