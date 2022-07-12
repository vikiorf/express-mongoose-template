//import dotenv
require('dotenv').config()

import morgan from 'morgan'

import mongoose from './src/config/database'
// import pkg from './package.json'
import cors from 'cors'

import express from 'express'
const app = express()

// Route imports
import routes from './src/routes/api'

const port = process.env.PORT || 3000

// DB settings
mongoose.connection.on(
  'error',
  // eslint-disable-next-line
  console.error.bind(console, 'DB Connection Error')
)

// Settings
// app.set('pkg', pkg)

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api', routes)

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Iceberry sandbox control'
  })
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server running on port:', port)
})
