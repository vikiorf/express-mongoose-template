const express = require('express')
const router = express.Router()

import AuthRoutes from './auth.routes'

// Import routes
router.use('/auth', AuthRoutes)

export default router 
