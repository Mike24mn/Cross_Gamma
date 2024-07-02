const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */ // Get all notes for a user
router.get("/user/:userId", rejectUnauthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `     SELECT 
    "entry_date",
    "ticker", 
    "contracts", 
    "strike", 
    "expiry",
    "initial_premia",
    "initial_potm",
    "initial_underlying_price",
    "user_id"
FROM 
    "options_positions_table"
WHERE 
    "user_id" = $1
ORDER BY 
    "ticker" ASC;
    `;
    const userVal = [userId];
    const result = await pool.query(query, userVal);
    console.log(
      "Fetched positions for user:",
      userId,
      "The users positions are:",
      result.rows
    );
    res.send(result.rows);
  } catch (error) {
    console.log("error get positions", error);
    res.sendStatus(500);
  }
});

module.exports = router;
