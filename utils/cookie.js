const jwt = require('jsonwebtoken')

function getDataUserCookie (cookie) {
  const token = cookie.accessToken
  if (!token) {
    const error = new Error('Invalid Credential')
    error.name = 'InvalidCredential'
    throw error
  }
  const { id, role } = jwt.verify(token, process.env.JWT_AUTH_SECRET)
  return { id, role }
}

module.exports = getDataUserCookie
