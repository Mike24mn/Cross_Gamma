import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }

function* fetchNotes(action) {
  try {
    // get the notes:
    console.log("fetchNotes action.payload value is: ",action.payload)
    const response = yield call(axios.get, `/api/notes/user/${action.payload.userId}`, config)
    console.log("fetchNotes response.data value is: ", response.data)
    yield put({ type: "SET_NOTE", payload: response.data })
  } catch (error) {
    console.log("fetchNotes error:", error)
  }
}

function* addNote(action) {
  try {
    console.log("addNote action.payload value is: ", action.payload)
    yield call(axios.post, "/api/notes", action.payload, config)
    console.log("Note added successfully")
    yield put({ type: "FETCH_NOTE", payload: {userId: action.payload.openpos_id}})
  } catch (error) {
    console.log("Error with the note post request", error)
  }
}

function* deleteNoteSaga(action) {
    try {
      console.log("deleteNoteSaga action.payload value is: ", action.payload)
      yield call(axios.delete, `/api/notes/${action.payload}`)
      console.log("Note deleted successfully")
      yield put({ type: 'DELETE_NOTE_SUCCESS', payload: action.payload.noteId})
    } catch (error) {
      yield put({ type: 'DELETE_NOTE_FAILED', payload: error })
    }
  }

function* editNoteSaga(action) {
    try {
      console.log("action.payload.note_id is:", action.payload.note_id );
        yield call(axios.put, `/api/notes/${action.payload.note_id}`, { note: action.payload.note })
        console.log("Note edited successfully");
  
        yield put({ type: "FETCH_NOTE", payload: { userId: action.payload.userId } });
    

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
