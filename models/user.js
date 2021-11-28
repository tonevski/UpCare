const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true, unique: true, minlength: 2, maxlength: 100 },
  password: { type: String, required: true, minlength: 2, maxlength: 255 },
  monitors: [String],
  created: { type: Date, default: Date.now },
})

const User = mongoose.model('User', schema)

module.exports = User
