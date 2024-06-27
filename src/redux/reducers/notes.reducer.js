const notesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTE":
      return action.payload;
    case "ADD_NOTE_SUCCESS":
      return [...state, action.payload];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default notesReducer;
