require('dotenv').config()

const express = require('express')
const { connectDB } = require('./src/config/db')
const mainRouter = require('./src/api/routes/main')
const cloudinary = require('cloudinary').v2
const cors = require('cors')

const app = express()

connectDB()

app.use(cors())

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY
})

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/api/v1', mainRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
