const multer = require('multer')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }, 
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  }
})
// const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = upload
