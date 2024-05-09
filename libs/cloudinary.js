const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dmvigke9d',
  api_key: '438744581893554',
  api_secret: 'gSCy_sjfJ-Fxr8Qn4SRclTiH050'
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
