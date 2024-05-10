const jwt = require('jsonwebtoken')

function getDataUserCookie (cookie) {
  const token = cookie.accessToken
  const { id, role } = jwt.verify(token, process.env.JWT_AUTH_SECRET)
  return { id, role }
}

module.exports = getDataUserCookie
