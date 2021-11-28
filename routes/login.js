const createSession = require('../helpers/session')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

// Route : GET /login
router.get('/', (req, res) => {
  res.render('login')
})

// Route : POST /login
router.post('/', async (req, res) => {
  // Check the user input
  if (!req.body.email) return res.status(400).send('Email is required!')
  if (!req.body.password) return res.status(400).send('Password is required!')

  // Check the email
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email')

  // // Check the password
  const password = await bcrypt.compare(req.body.password, user.password)
  if (!password) return res.status(400).send('Invalid password')

  // Create session and cookie
  await createSession(res, user.id, user.email)

  res.send('Logged in')
})

module.exports = router
