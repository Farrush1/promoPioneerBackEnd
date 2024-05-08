const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt)
}

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
