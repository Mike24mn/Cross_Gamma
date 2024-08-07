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
      WHERE "user"."id" =  $1
        ORDER BY "options_positions_table"."ticker" ASC;
    `;
    const userVal = [userId];
    const result = await pool.query(query, userVal);
    console.log("Fetched positions with notes:", result.rows);
    res.send(result.rows);
  } catch (error) {
    console.log("error get notes", error);
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */ // Add new Note

// summary: check options_positions_table for a position, if not found, insert position and get its ID, then add the note to notes_table using that ID
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { note, ticker, entry_date, user_id } = req.body;

  try {
    // see if position exists
    const existingPositionResult = await pool.query(
      `SELECT "positions_id" FROM "options_positions_table"
       WHERE "user_id" = $1 AND "ticker" = $2 AND "entry_date" = $3`,
      [user_id, ticker, entry_date]
    );

    let positionId;

    if (existingPositionResult.rows.length > 0) {
      // if the position exists, grab its positions_id
      positionId = existingPositionResult.rows[0].positions_id;
    } else {
      // if the position doesn't exist, insert new position
      const newPositionResult = await pool.query(
        `INSERT INTO "options_positions_table" ("user_id", "ticker", "entry_date")
         VALUES ($1, $2, $3)
         RETURNING "positions_id"`,
        [user_id, ticker, entry_date]
      );
      positionId = newPositionResult.rows[0].positions_id;
    }

    // insert note using positions_id
    await pool.query(
      `INSERT INTO "notes_table" ("openpos_id", "note", "note_created")
       VALUES ($1, $2, NOW())`,
      [positionId, note]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).send("Error add note");
  }
});

router.delete("/:noteId", rejectUnauthenticated, async (req, res) => {
  const { noteId } = req.params;
  try {
    await pool.query(`DELETE FROM "notes_table" WHERE "note_id" = $1`, [
      noteId,
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("Error delete note");
  }
});

router.put("/:note_id", rejectUnauthenticated, async (req, res) => {
  const { note_id } = req.params;
  const { note } = req.body;

  console.log("req.params is: ", req.params);
  console.log("req.body is: ", req.body);

  try {
    const query = `UPDATE "notes_table" SET "note" = $1 WHERE "note_id" = $2`;
    await pool.query(query, [note, note_id]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error editing note:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
