import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";



const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
function* fetchNotes(action) {
  try {
    // get the notes:
    console.log("fetchNotes action.payload value is: ",action.payload);
    const response = yield call(axios.get, `/api/notes/user/${action.payload.userId}`, config)
    yield put({ type: "SET_NOTE", payload: response.data })
  } catch (error) {
    console.log("fetchNotes error:", error)
  }
}

function* addNote(action) {
  try {
    yield call(axios.post, "/api/notes", action.payload, config)
    yield put({ type: "FETCH_NOTE", payload: {userId: action.payload.openpos_id}})
  } catch (error) {
    console.log("Error with the note post request", error)
  }
}

function* deleteNoteSaga(action) {
    try {
      yield call(axios.delete, `/api/notes/${action.payload}`)
      yield put({ type: 'DELETE_NOTE_SUCCESS', payload: noteId})
    } catch (error) {
      yield put({ type: 'DELETE_NOTE_FAILED', payload: error })
    }
  }

function* editNoteSaga(action) {
    try {
        yield call(axios.put, `/api/notes/${action.payload.note_id}`, { note: action.payload.note })

    } catch (error) {
        console.error('Error editing note:', error)
    }
}

function* notesSaga() {
  yield takeLatest("FETCH_NOTE", fetchNotes)
  yield takeLatest("ADD_NOTE", addNote)
  yield takeLatest("DELETE_NOTE_REQUEST", deleteNoteSaga)
  yield takeLatest('EDIT_NOTE', editNoteSaga)
}
export default notesSaga;
