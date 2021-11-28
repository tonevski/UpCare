const createSession = require('../helpers/session')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

// Route : GET /register
router.get('/', (req, res) => {
  res.render('register')
})

// Route : POST /register
router.post('/', async (req, res) => {
  // Check if user input is empty
  if (!req.body.name) return res.status(400).send('Name is required!')
  if (!req.body.email) return res.status(400).send('Email is required!')
  if (!req.body.password) return res.status(400).send('Password is required!')

  // Check if the email is taken
  const check = await User.findOne({ email: req.body.email })
  if (check) return res.status(400).send('Email is taken!')

  // Create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  // Save the user
  try {
    await user.save()
  } catch (error) {
    return res.status(400).send(error.message)
  }

  // Create session and cookie
  await createSession(res, user.id, user.email)

  res.send('Registered')
})

module.exports = router
