const express = require('express')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const schwabApi = require('./api/schwabApi.js')

// Middleware setup
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

// Session setup
app.use(session({
  secret: process.env.SERVER_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // In production, set this to true with HTTPS
}))

// Passport and session middleware
const sessionMiddleware = require('./modules/session-middleware')
const passport = require('./strategies/user.strategy')
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

// Route includes
const userRouter = require('./routes/user.router')
const notesRouter = require('./routes/notes.router')

// OAuth Routes
app.get('/auth', (req, res) => {
  try {
    console.log('Handling GET request to /auth');
    console.log('Current authUrl INSIDE /AUTH ROUTE:', schwabApi.authUrl)
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
});

// Application routes
app.use('/api/user', userRouter)
app.use('/api/notes', notesRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
