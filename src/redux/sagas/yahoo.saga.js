import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";


function* fetchChart() {
    try {
          const response = yield axios.get('/api/yahoo/chart/AAPL');
          yield put({ type: 'SET_CHART', payload: response.data });
        } catch (error) {
          console.log('Chart get request failed', error)
          yield put({ type: 'FETCH_CHART_FAILED', error: error.message })
        }
}
function* chartSaga() {
    yield takeLatest('FETCH_CHART', fetchChart);
  }

export default chartSaga;
// need to create saga with yahoo chart