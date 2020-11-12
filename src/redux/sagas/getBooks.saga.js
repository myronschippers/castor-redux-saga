import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getBooks(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    const response = yield axios.get('/books');
    console.log(response.data);
    // version of a dispatch = put
    yield put({
      type: 'SET_BOOKS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'ERROR_MSG',
      payload: 'There was a problem loading books. Please try again.',
    });
  }
  // .then((response) => {
  //   // setState => dispatch
  //   this.props.dispatch({
  //     type: 'SET_BOOKS',
  //     payload: response.data,
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  //   // surface message to user
  //   alert('Something went terribly wrong.');
  // });
}

function* getBooksSaga() {
  yield takeLatest('GET_BOOKS', getBooks);
}

export default getBooksSaga;
