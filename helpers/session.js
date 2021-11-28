const Session = require('../models/session')

module.exports = async function (res, user, email) {
  // Delete old sessions
  await Session.deleteMany({ email: email })

  // Create session
  const session = new Session({
    user: user,
    email: email,
  })

  // Save the new session
  try {
    await session.save()
  } catch (error) {
    return res.status(400).send(error.message)
  }

  // @TODO
  // In production set the Cookie to secure
  // let secureCookie = false
  // if (process.env.NODE_ENV === 'production') secureCookie = true

  // Create cookie
  res.cookie('session', session.id, {
    domain: 'localhost',
    maxAge: 60 * 60 * 1000, // One hour
    secure: false,
    httpOnly: true,
  })

  // Create cookie
  res.cookie('registered', true, {
    domain: 'localhost',
    maxAge: 60 * 60 * 1000 * 24 * 31 * 12, // One year
    secure: false,
    httpOnly: true,
  })
}
