import { all } from 'redux-saga/effects';

// SAGAS
import postBookSaga from './postBook.saga';
import getBooksSaga from './getBooks.saga';
import firstSagaSaga from './firstSaga.saga';

function* rootSaga() {
  // register all sagas
  yield all([
    // listing sagas
    postBookSaga(),
    getBooksSaga(),
    firstSagaSaga(),
  ]);
}

export default rootSaga;
