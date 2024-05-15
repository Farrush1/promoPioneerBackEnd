const express = require('express')
const WarehouseController = require('../../controllers/warehouse')
const router = express.Router()

router.get('/', WarehouseController.getAll)

module.exports = router
