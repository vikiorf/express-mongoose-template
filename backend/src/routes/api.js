const express = require('express')
const router = express.Router()

// Import routes
router.use('/auth', require('./auth.routes'))

module.exports = router
