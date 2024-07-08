const positionsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POSITIONS":
      return action.payload || [];
    default:
      return state;
  }
};

export default positionsReducer;
