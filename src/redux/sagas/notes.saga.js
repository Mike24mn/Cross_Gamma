import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

function* fetchNotes() {
  try {
    // Get the notes:
    const response = yield axios.get("/api/notes", config);
    // Set the value of the genres reducer:
    yield put({
      type: "SET_NOTES",
      payload: response.data,
    });
  } catch (error) {
    console.log("fetchNotes error:", error);
  }
}

function* addNote(action) {
  try {
    yield call(axios.post, "/api/notes", action.payload);
    yield put({ type: "FETCH_NOTE" });
  } catch (error) {
    console.log("Error with the shelf post request", error);
  }
}

function* notesSaga() {
  yield takeLatest("FETCH_NOTE", fetchNotes);
  yield takeLatest("ADD_NOTE", addNote);
}
export default notesSaga;
