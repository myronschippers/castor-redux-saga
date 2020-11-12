import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postBook(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post(`/books`, action.payload);
    // .then((response) => {
    //   this.props.getCallback();
    // })
    // .catch((err) => {
    //   console.log(err);
    //   alert('Your book did not get saved, please try again.');
    // });
    yield put({
      type: 'GET_BOOKS',
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: "Sorry we couldn't save your book. Please try again.",
    });
  }
}

function* postBookSaga() {
  yield takeLatest('POST_BOOK', postBook);
}

export default postBookSaga;
