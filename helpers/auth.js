const Session = require('../models/session')

module.exports = async function (req, res, next) {
  // Check if is registered
  if (req.cookies.registered) res.locals.registered = true

  // Set the auth to initial false state
  res.locals.auth = false

  // Get the session ID from the cookie
  const sid = req.cookies.session

  // Check if the session ID is valid
  if (!sid || !sid.match(/^[0-9a-fA-F]{24}$/)) {
    return next()
  }

  const session = await Session.findById(sid)

  // If session exists, set the req.session and req.user
  if (session) {
    req.session = session.id
    req.user = session.user
    res.locals.auth = true
  }

  next()
}
