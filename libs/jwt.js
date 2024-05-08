const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const sign = (dataObj) => {
  const token = jwt.sign(dataObj, process.env.JWT_AUTH_SECRET, {
    expiresIn: '1d',
  })
  return token
}

module.exports = sign
