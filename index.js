const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser') 
const dotenv = require('dotenv')
const router = require('./router/index')
const errorHandler = require('./middleware/errorHandler')
dotenv.config()

const app = express()

app.use(morgan('tiny'))

app.use(cookieParser())
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(process.env.BACKEND_PORT, () => {
  console.log('app running in port 5000')
})
