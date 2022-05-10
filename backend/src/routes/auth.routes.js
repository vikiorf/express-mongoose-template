const express = require('express')

const router = express.Router()

const authCtrl = require('../controllers/auth.controller')
const { verifyToken } = require('../middleware/authToken')

router.post('/signup', authCtrl.signUp)

router.post('/login', authCtrl.logIn)

router.get('/user/:userId', [verifyToken], authCtrl.user)

router.get('/users', authCtrl.users)

module.exports = router
