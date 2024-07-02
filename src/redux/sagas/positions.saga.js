import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";


function* fetchPositions(action) {
    
  try {
    // get the positions:
    const { userId} = action.payload
    console.log("fetchPositions action.payload is:", action.payload);
    const response = yield call(axios.get, `/api/positions/user/${userId}`)
    console.log("fetch positions response data is", response.data);
    yield put({ type: "SET_POSITIONS", payload: response.data })
  } catch (error) {
    console.log("fetch positions error:", error)
  }
}



function* positionsSaga() {
  yield takeLatest("FETCH_POSITIONS", fetchPositions)
}
export default positionsSaga;