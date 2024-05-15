const express = require('express')
const CityController = require('../../controllers/cityController')
const router = express.Router()

router.get('/', CityController.getAll)

module.exports = router
