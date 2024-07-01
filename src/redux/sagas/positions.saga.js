import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";



const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
function* fetchPositions(action) {
  try {
    // get the positions:
    console.log(action.payload);
    const response = yield call(axios.get, `/api/positions/user/${action.payload.userId}`, config)
    yield put({ type: "SET_POSITIONS", payload: response.data })
  } catch (error) {
    console.log("fetch positions error:", error)
  }
}



function* positionsSaga() {
  yield takeLatest("FETCH_POSITIONS", fetchPositions)
}
export default positionsSaga;