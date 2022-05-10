//import dotenv
require('dotenv').config()

const morgan = require('morgan')
const mongoose = require('./src/config/database')
const pkg = require('./package.json')
const cors = require('cors')

const express = require('express')
const app = express()

// Route imports
const routes = require('./src/routes/api')

const port = process.env.PORT || 3000

// DB settings
mongoose.connection.on(
  'error',
  // eslint-disable-next-line
  console.error.bind(console, 'DB Connection Error')
)

// Settings
app.set('pkg', pkg)

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
    author: app.get('pkg').author,
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server running on port:', port)
})
