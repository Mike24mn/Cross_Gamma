import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";



const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
function* fetchNotes(action) {
  try {
    // Get the notes:
    console.log(action.payload);
    const response = yield call(axios.get, `/api/notes/user/${action.payload.userId}`, config);
    yield put({ type: "SET_NOTE", payload: response.data })
  } catch (error) {
    console.log("fetchNotes error:", error);
  }
}

function* addNote(action) {
  try {
    yield call(axios.post, "/api/notes", action.payload, config);
    yield put({ type: "FETCH_NOTE", payload: {userId: action.payload.openpos_id}})
  } catch (error) {
    console.log("Error with the note post request", error);
  }
}

function* notesSaga() {
  yield takeLatest("FETCH_NOTE", fetchNotes);
  yield takeLatest("ADD_NOTE", addNote);
}
export default notesSaga;
