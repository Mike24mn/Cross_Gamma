const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/notes/:userId", rejectUnauthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `    SELECT 
      "notes_table"."note_id", 
      "notes_table"."note", 
      "notes_table"."note_created", 
      "options_positions_table"."entry_date",
      "options_positions_table"."ticker", 
      "options_positions_table"."contracts", 
      "options_positions_table"."strike", 
      "options_positions_table"."expiry"
    FROM 
      "notes_table"
    JOIN 
      "options_positions_table" ON "notes_table"."openpos_id" = "options_positions_table"."positions_id"
    JOIN 
      "user" ON  "options_positions_table"."user_id" = "user"."id"
    WHERE "user"."id" =  $1;
    `;
    const userVal = [userId];
    const result = await pool.query(query, values);
    res.send(result.rows);
  } catch (error) {
    console.log("error get notes", error);
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
