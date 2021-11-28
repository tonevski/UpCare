const Session = require('../models/session')
const express = require('express')
const router = express.Router()

// Route : GET /logout
router.get('/', async (req, res) => {
  // Check if the req.session exists
  if (!req.session) return res.redirect('/')

  // Delete session by ID
  try {
    await Session.findByIdAndDelete(req.session)
  } catch (error) {
    return res.status(400).send(error.message)
  }

  // Redirect to Homepage
  res.redirect('/')
})

module.exports = router
