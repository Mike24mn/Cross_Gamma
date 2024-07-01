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
  const { userId } = req.params
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
    `
    const userVal = [userId]
    const result = await pool.query(query, userVal)
    console.log('Fetched positions with notes:', result.rows)
    res.send(result.rows)
  } catch (error) {
    console.log("error get notes", error)
    res.sendStatus(500)
  }
});

/**
 * POST route template
 */ // Add new Note 
router.post('/', rejectUnauthenticated, async (req, res) => {
    const { openpos_id, note } = req.body
    try {


      await pool.query(
        `INSERT INTO "notes_table" ("openpos_id", "note", "note_created")
         VALUES ($1, $2, NOW())`, // timestamp that NOW
        [openpos_id, note]
      );
      res.sendStatus(201);
    } catch (error) {
      console.error('Error adding note:', error)
      res.status(500).send('Error add note')
    }
  })

  router.delete('/:noteId', rejectUnauthenticated, async (req, res) => {
    const { noteId } = req.params
    try {
      await pool.query(
        `DELETE FROM "notes_table" WHERE "note_id" = $1`,
        [noteId]
      );
      res.sendStatus(200)
    } catch (error) {
      console.error('Error deleting note:', error)
      res.status(500).send('Error delete note')
    }
  })

  router.put("/:note_id", rejectUnauthenticated, async (req, res) => {
    const { note_id } = req.params
    const { note } = req.body
  
    try {
      const query = `UPDATE "notes_table" SET "note" = $1 WHERE "note_id" = $2`
      await pool.query(query, [note, note_id])
      res.sendStatus(200)
    } catch (error) {
      console.error("Error editing note:", error)
      res.sendStatus(500)
    }
  });

module.exports = router;
