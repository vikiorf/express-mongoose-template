import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    })
  }

  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password)
  })

  const savedUser = await newUser.save()

  const newToken = jwt.sign({ id: savedUser._id }, 'secretKey', {
    expiresIn: 86400 // one day
  })

  return res.json({
    _id: savedUser._id,
    name: savedUser.name,
    message: 'Signup Successful',
    token: newToken
  })
}

export const logIn = async (req: Request, res: Response) => {
  const userExist = await User.findOne({ email: req.body.email })

  if (!userExist)
    return res.status(400).json({
      message: 'User does not exist'
    })

  const matchPassword = await User.comparePassword(
    req.body.password,
    userExist.password
  )

  if (!matchPassword)
    return res.status(401).json({
      token: null,
      message: 'Invalid password'
    })

  const token = jwt.sign({ id: userExist._id }, 'secretKey', {
    expiresIn: 86400
  })

  return res.json({
    _id: userExist._id,
    name: userExist.name,
    message: 'Auth Successful',
    token: token
  })
}

export const user = async (req: Request, res: Response) => {
  const { userId } = req.params
  const user = await User.findById(userId).select('-password')

  res.json(user)
}

export const users = async (req: Request, res: Response) => {
  const users = await User.find()

  res.json(users)
}
