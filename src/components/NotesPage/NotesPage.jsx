import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64a9ad", // Turquois color
    },
    background: {
      default: "#424242", // background color 
      paper: "#616161", //  paper color 
    },
  },
})

function NotesPage() {
  const noteItems = useSelector((store) => store.notesReducer)
  const [entryDate, setEntryDate] = useState("")
  const [editedNote, setEditedNote] = useState("")
  const [editNoteId, setEditNoteId] = useState(null)
  const userId = useSelector((state) => state.user.id)
  const dispatch = useDispatch()

  const [note, setNote] = useState("")
  const [ticker, setTicker] = useState("")

  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_NOTE", payload: { userId } })
    }
  }, [userId, dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()

    // check if all fields are filled
    if (!note || !ticker || !entryDate) {
      alert("Please fill in all fields (note, ticker, entry date) before submitting.")
      return
    }

    dispatch({
      type: "ADD_NOTE",
      payload: { openpos_id: userId, note, ticker, entry_date: entryDate }
    })

    // clear the inputs
    setNote("")
    setTicker("")
    setEntryDate("")
  };

  const handleDelete = (noteId) => {
    console.log("Deleting note with ID:", noteId)
    dispatch({ type: "DELETE_NOTE_REQUEST", payload: noteId })
    dispatch({ type: "FETCH_NOTE", payload: { userId } })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    dispatch({ type: "EDIT_NOTE", payload: { note_id: editNoteId, note: editedNote } })
    setEditNoteId(null)
    setEditedNote("")
    dispatch({ type: "FETCH_NOTE", payload: { userId } })
  }

  const handleEdit = (noteId, noteContents) => {
    setEditNoteId(noteId)
    setEditedNote(noteContents)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <h2 style={{ color: "white" }}>Notes:</h2>
  <center>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ticker"
            value={ticker}
            onChange={(event) => setTicker(event.target.value)}
          />
          <input
            type="text"
            placeholder="Add Note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <input
            type="text"
            placeholder="Entry Date"
            value={entryDate}
            onChange={(event) => setEntryDate(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        </center>
        <p></p>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="notes table">
            <TableHead>
              <TableRow>
                <TableCell>Ticker:</TableCell>
                <TableCell>Note:</TableCell>
                <TableCell>Entry Date:</TableCell>
                <TableCell>Note Created:</TableCell>
                <TableCell>Action:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noteItems.map((item) => (
                <TableRow key={item.note_id}>
                  <TableCell>{item.ticker}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>{item.entry_date.substring(0, 10)}</TableCell>
                  <TableCell>{item.note_created.substring(0, 10)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(item.note_id, item.note)}
                      variant="contained"
                      color="primary"
                      sx={{ bgcolor: "#64a9ad" }} // Turquoise color for Edit button
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.note_id)}
                      variant="contained"
                      color="error"
                      disabled={editNoteId === item.note_id}
                      sx={{ bgcolor: grey[800], "&:hover": { bgcolor: grey[900] } }} // Dark grey for Delete button
                    >
                      Delete
                    </Button>
                    {editNoteId === item.note_id && (
                      <form onSubmit={handleEditSubmit}>
                        <input
                          type="text"
                          value={editedNote}
                          onChange={(event) => setEditedNote(event.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary">
                          Save
                        </Button>
                        <Button onClick={() => setEditNoteId(null)} variant="contained" sx={{ bgcolor: grey[800] }}>
                          Cancel
                        </Button>
                      </form>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}

export default NotesPage;
