const Session = require('../models/session')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

// Route : GET /
router.get('/', (req, res) => {
  res.render('index')
})

// Route : GET /login
router.get('/login', (req, res) => {
  res.send('/login')
})

// Route : GET /register
router.get('/register', (req, res) => {
  res.send('/register')
})

// Route : POST /login
router.post('/login', (req, res) => {
  res.send('OK')
})

// Route : POST /register
router.post('/register', (req, res) => {
  res.send('OK')
})

module.exports = router
