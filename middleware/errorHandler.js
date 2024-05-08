const errorHandler = (err, req, res, next) => {
  if (err.name === 'BadRequest') {
    return res.status(400).json({ message: err.message })
  }
  if (err.name === 'ErrorNotFound') {
    return res.status(404).json({ message: err.message })
  }
  if (err.name === 'InvalidCredential') {
    return res.status(401).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Internal Server Error' })
}

module.exports = errorHandler
