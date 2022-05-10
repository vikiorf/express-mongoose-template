const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
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
    token: newToken,
    preferences: savedUser.preferences
  })
}

exports.logIn = async (req, res) => {
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
    token: token,
    preferences: userExist.preferences
  })
}

exports.user = async (req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId).select('-password')

  // delete user.password

  res.json(user)
}

exports.users = async (req, res) => {
  const users = await User.find()

  res.json(users)
}
