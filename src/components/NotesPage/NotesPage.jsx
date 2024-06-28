import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";
import { useEffect, useState } from "react";

function NotesPage() {
  const dispatch = useDispatch();
  const noteItems = useSelector((store) => store.notesReducer);
  const [note, setNote] = useState("");
  const userId = useSelector((state) => state.user.id);
  const [editedNote, setEditedNote] = useState('')
  const [editNoteId, setEditNoteId] = useState(null)

  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_NOTE", payload: { userId } });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    dispatch({ type: "ADD_NOTE", payload: { openpos_id: userId, note } });

    // Clear input
    setNote("");
  };

  const handleDelete = (noteId) => {
    console.log("Deleting note with ID:", noteId);
    dispatch({ type: "DELETE_NOTE_REQUEST", payload: noteId })
    dispatch({ type: "FETCH_NOTE", payload: { userId } })
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "EDIT_NOTE", payload: { note_id: editNoteId, note: editedNote }}); // may be wrong
    setEditNoteId(null) // set edit note id to null, NOTE: make sure nulls can be handled here 
    setEditedNote('') // reset edited note value 
    dispatch({ type: "FETCH_NOTE", payload: { userId } })
  };

  const handleEdit = (noteId, noteContents) => {
    setEditNoteId(noteId) // set the ID of current 
    setEditedNote(noteContents) // sent current edited note contents

  }

  return (
    <div className="container">
      <h2>Notes:</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <p>All of the available notes can be seen here.</p>

  
      <ul>
        {noteItems.map((item) => (
          <li key={item.note_id}>
            {item.note}
            <button onClick={() => handleEdit(item.note_id, item.note)}>Edit</button>
            <button onClick={() => handleDelete(item.note_id)}>Delete</button>
            
            {editNoteId === item.note_id && (
              <form onSubmit={handleEditSubmit}>
                <input 
                  type='text'
                  value={editedNote}
                  onChange={(event) => setEditedNote(event.target.value)}
                />
                <button type='submit'>Save</button>
                <button onClick={() => setEditNoteId(null)}>Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesPage;
