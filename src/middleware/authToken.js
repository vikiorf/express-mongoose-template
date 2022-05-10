const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.validateToken = async token => {
  try {
    if (!token) return { status: false, message: 'No token' }
    const decoded = jwt.verify(token, 'secretKey')
    const userId = decoded.id

    const user = await User.findById(userId, { password: 0 })
    if (!user)
      return {
        status: false,
        message: 'User not found'
      }
    return true
  } catch (error) {
    return { status: false, message: error }
  }
}

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token)
      return res.status(403).json({
        message: 'No token provided'
      })
    const decoded = jwt.verify(token, 'secretKey')
    res.locals.userId = decoded.id

    const user = await User.findById(res.locals.userId, { password: 0 })
    if (!user)
      return res.status(404).json({
        message: 'No user found'
      })
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}
