const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NANE,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function cloudinaryUpload (filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = cloudinaryUpload
