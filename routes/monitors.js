const Monitor = require('../models/monitor')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

// Route: GET /monitors - Auth - Display all monitors
router.get('/', async (req, res) => {
  res.send('/monitors')
})

// Route: GET /monitors/:id - Auth - Create a monitor
router.get('/:id', async (req, res) => {
  res.send('/monitors/:id')
})

// Route: POST /monitors - Auth - Create a monitor
router.post('/', async (req, res) => {
  res.send('OK')
})

module.exports = router
