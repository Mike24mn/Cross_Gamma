const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const schwabApi = require('./api/schwabApi.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// OAuth Routes

app.get('/auth', (req, res) => {
  res.send(`<a href="${schwabApi.authUrl}">Authenticate via Charles Schwab</a>`)
})

app.get('/callback', async (req, res) => {
  const returnedLink = req.query.code
  try {
    const tokenData = await schwabApi.getToken(returnedLink)
    req.session.tokenData = tokenData;
    res.json(tokenData)
  } catch (error) {
    res.status(500).send('Error retrieving thy token')
  }
})

app.get('/accountNumbers', async (req, res) => {
  const tokenData = req.session.tokenData;
  if (!tokenData) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const accountData = await schwabApi.getAccountNum(tokenData.access_token);
    res.json(accountData);
  } catch (error) {
    res.status(500).send('Error retrieving account numbers');
  }
});

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const notesRouter = require("./routes/notes.router.js")

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));


// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter)

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
