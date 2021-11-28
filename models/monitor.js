const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  website: { type: String, required: true, minlength: 4, maxlength: 50 },
  status: { type: String, default: 'operational' },
  paused: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
})

const Monitor = mongoose.model('Monitor', schema)

module.exports = Monitor
