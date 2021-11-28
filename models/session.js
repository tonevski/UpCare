const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user: String,
  email: String,
  created: { type: Date, default: Date.now },
})

const Session = mongoose.model('Session', schema)

module.exports = Session
