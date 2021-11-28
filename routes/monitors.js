const Monitor = require('../models/monitor')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

// Route: GET /monitors - Auth - Display All Monitors
router.get('/', async (req, res) => {
  // Check if the session and user IDs exists
  if (!req.session || !req.user) return res.status(401).send('Unauthorized')

  // Get the User object from the DB
  const user = await User.findById(req.user)

  // Get all the monitors of that User
  const monitors = await Monitor.find().where('_id').in(user.monitors).exec()

  res.render('monitors/index', { monitors: monitors })
})

// Route: GET /monitors/new - Auth - Display Add New Monitor
router.get('/new', (req, res) => {
  res.render('monitors/new')
})

// Route: GET /monitors - Auth - Display a Single Monitor
router.get('/:id', async (req, res) => {
  // Check if the session and user IDs exists
  if (!req.session || !req.user) return res.status(401).send('Unauthorized')

  // Get the User object from the DB
  const user = await User.findById(req.user)

  // Check if the User is owner of the monitor
  if (user.monitors.includes(req.params.id)) {
    const monitor = await Monitor.findById(req.params.id)
    return res.send('Monitor: ' + JSON.stringify(monitor))
  } else {
    return res.status(401).send('Unauthorized')
  }
})

// Route: POST /monitors - Auth - Create a Monitor
router.post('/', async (req, res) => {
  // Check if the session and user IDs exists
  if (!req.session || !req.user) return res.status(401).send('Unauthorized')

  // Check the user input
  if (!req.body.name) return res.status(400).send('Name is required!')
  if (!req.body.website) return res.status(400).send('Website is required!')

  // Create the monitor
  const monitor = new Monitor({
    name: req.body.name,
    website: req.body.website,
  })

  // Save the monitor
  try {
    await monitor.save()
  } catch (error) {
    return res.status(400).send(error.message)
  }

  // Push this monitor to the User's array of monitors
  await User.findByIdAndUpdate(req.user, { $push: { monitors: monitor.id } })

  res.send('Monitor Saved!')
})

module.exports = router
