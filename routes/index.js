const express = require('express')
const router = express.Router()

// Route : GET /
router.get('/', (req, res) => {
  res.render('index')
})

// Route : GET /contact
router.get('/contact', (req, res) => {
  res.render('contact')
})

// Route : GET /stats
router.get('/stats', (req, res) => {
  res.render('stats')
})

module.exports = router
