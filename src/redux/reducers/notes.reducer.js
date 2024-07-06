const notesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTE":
      return action.payload || [];
    case "DELETE_NOTE_SUCCESS":
      return state.filter(note => note.note_id !== action.payload) // filter creates new array, then we check if the note id is equal to the payload, if so condition is false and note will be deleted, else evaluate true and include the note in new array 
    case "DELETE_NOTE_FAILED":
      console.error('Delete note failed:', action.payload) // logs error without changing thee state
      return state;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default notesReducer;
