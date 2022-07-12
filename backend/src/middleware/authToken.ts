import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

exports.validateToken = async (token: string) => {
  try {
    if (!token) return { status: false, message: 'No token' }
    const decoded = jwt.verify(token, 'secretKey')! as jwt.JwtPayload
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

exports.verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token']
    if (!token)
      return res.status(403).json({
        message: 'No token provided'
      })
    const decoded = jwt.verify(token! as string, 'secretKey')! as jwt.JwtPayload
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
