const express = require('express')
const AnonimusController = require('../../controllers/anonymusController')
const router = express.Router()

router.get('/', AnonimusController.getAll)

module.exports = router
