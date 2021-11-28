const auth = require('./helpers/auth')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

// Get the port from process.env or set to 3000
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(auth)

// Connect to MongoDB
require('./helpers/database')()

// Routes
app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/register', require('./routes/register'))
app.use('/monitors', require('./routes/monitors'))

// Listen for connections on the specified port.
app.listen(PORT, () => console.log('Listening on port ' + PORT))
