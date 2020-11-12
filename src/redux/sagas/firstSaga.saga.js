import { takeLatest } from 'redux-saga/effects';

function* firstSaga(action) {
  console.log('firstSaga run:', action);
}

function* firstSagaSaga() {
  yield takeLatest('FIRST_SAGA', firstSaga);
}

export default firstSagaSaga;
