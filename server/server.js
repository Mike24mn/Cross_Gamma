const express = require('express')
const cors = require('cors')
const session = require('express-session')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5001
const schwabApi = require('./api/schwabApi.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))

app.use(session({
  secret: process.env.SERVER_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note to self: 'secure' should be true in production mode with HTTPS to prevent dealing with potential sec. concerns
}))

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware')
const passport = require('./strategies/user.strategy')

// Route Includes
const userRouter = require('./routes/user.router')
const notesRouter = require('./routes/notes.router')

// Express Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // cross origin credentials (cookies, authorization headers)
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))

// Passport Session Configuration
app.use(sessionMiddleware)

// Start Passport Sessions
app.use(passport.initialize())
app.use(passport.session())

// OAuth Routes

app.get('/auth', (req, res) => {
  try {
    console.log('Handling GET request to /auth')
    console.log('Current authUrl INSIDE /AUTH ROUTE:', schwabApi) // tested w/ postman, response being recieved from our schwabApi.js
    res.json({ authUrl: schwabApi.authUrl })
  } catch (error) {
    console.error('Error in /auth route:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
});

app.get('/callback', async (req, res) => {
  const returnedCode = req.query.code
  try {
    const tokenData = await schwabApi.getToken(returnedCode)
    req.session.tokenData = tokenData
    res.json(tokenData)
  } catch (error) {
    console.error('Error retrieving token:', error)
    res.status(500).send('Error retrieving token')
  }
})

app.get('/accountNumbers', async (req, res) => {
  const tokenData = req.session.tokenData;
  if (!tokenData) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const accountData = await schwabApi.getAccountNum(tokenData.access_token)
    res.json(accountData)
  } catch (error) {
    console.error('Error retrieving account numbers:', error)
    res.status(500).send('Error retrieving account numbers')
  }
})

// Routes
app.use('/api/user', userRouter)
app.use('/api/notes', notesRouter)

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
