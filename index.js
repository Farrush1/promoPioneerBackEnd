const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const router = require('./router/index')
const errorHandler = require('./middleware/errorHandler')
dotenv.config()
const cors = require('cors')
const getDataUserCookie = require('./utils/cookie')

const app = express()

app.use(cors({ credentials: true }))
// // const extractTokenMiddleware = (req, res, next) => {
// //   const user = getDataUserCookie(req)
// //   console.log(user)
// //   req.user = user // Store extracted token in the request object
// //   next() // Pass control to the next middleware or route handler
// // }

// app.use(extractTokenMiddleware)
app.use(morgan('tiny'))

app.use(cookieParser())
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(process.env.BACKEND_PORT, () => {
  console.log('app running in port 5000')
})
