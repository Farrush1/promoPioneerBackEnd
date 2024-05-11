const errorHandler = (err, req, res, next) => {
  if (err.name === 'BadRequest') {
    return res.status(400).json({ message: 'Bad Request, check your request body!' })
  }
  if (err.name === 'ErrorNotFound') {
    return res.status(404).json({ message: 'Not Found!' })
  }
  if (err.name === 'InvalidCredential') {
    return res.status(401).json({ message: 'Invalid Credential!' })
  }
  if (err.name === 'Conflict') {
    return res.status(409).json({ message: 'Already Exist!' })
  }

  return res.status(500).json({ message: 'Internal Server Error' })
}

module.exports = errorHandler
