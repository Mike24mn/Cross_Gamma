const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const schwabApi = require("./api/schwabApi.js");

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

// CORS configuration, allows sharing between trusted sites basically
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow browser to send identity related info
  })
);

// Session setup
app.use(
  session({
    secret: process.env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // In production, set this to true with HTTPS, NOTE: WE ARE NOT USING HTTPS CURRENTLY
  })
);

// GET RID OF THIS AFTER TESTING LATER
app.use((req, res, next) => {
  console.log("Session Middleware Hit");
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  next();
});
// SESSION TESING END, NO NEED FOR THIS LATER DELETE ABOVE

// Passport and session middleware
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Route includes
const userRouter = require("./routes/user.router");
const notesRouter = require("./routes/notes.router");
const positionsRouter = require("./routes/positions.router.js");
const yahooRouter = require("./routes/yahoo.router.js");

// OAuth Routes
app.get("/auth", (req, res) => {
  try {
    console.log("Handling GET request to /auth");
    console.log("Current authUrl INSIDE /AUTH ROUTE:", schwabApi.authUrl);
    res.json({ authUrl: schwabApi.authUrl });
  } catch (error) {
    console.error("Error in /auth route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/callback", async (req, res) => {
  const encodedCode = req.query.code;
  const returnedCode = decodeURIComponent(encodedCode); // adjusted to decode req.query.code
  console.log("original encoded code:", encodedCode); // delete this
  console.log("returned code is:", returnedCode); // delete this
  try {
    const tokenData = await schwabApi.getToken(returnedCode);
    req.session.tokenData = tokenData;
    res.json(tokenData);
  } catch (error) {
    console.error("Error retrieving thy token:", error);
    res.status(500).send("Error retrieving thy token");
  }
});

app.get("/accountNumbers", async (req, res) => {
  const tokenData = req.session.tokenData;
  if (!tokenData) {
    return res.status(401).send("Unauthorized, MEANING NO TOKEN DATA");
  }
  try {
    const accountData = await schwabApi.getAccountNum(tokenData.access_token);
    res.json(accountData);
  } catch (error) {
    console.error("Error retrieving account numbers:", error);
    res.status(500).send("Error retrieving account numbers");
  }
});

// Application routes
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/positions", positionsRouter);
app.use("/api/yahoo", yahooRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
