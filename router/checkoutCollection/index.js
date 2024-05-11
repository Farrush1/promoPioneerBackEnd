const express = require('express')

const router = express.Router()

router.get('/', CategoryController.getAll)


module.exports = router
