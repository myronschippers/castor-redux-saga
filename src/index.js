import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

// Redux Dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// SAGA
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

//
// Redux Reducers
// ------------------------------

const bookList = (state = [], action) => {
  if (action.type === 'SET_BOOKS') {
    return action.payload;
  }

  return state;
};

const errorMessage = (state = null, action) => {
  if (action.type === 'ERROR_MSG') {
    return action.payload;
  } else if (action.type === 'ERROR_RESET') {
    return null;
  }

  return state;
};

//
// Saga Functions
// ------------------------------

function* watcherSaga() {
  // register all sagas
  yield takeLatest('FIRST_SAGA', firstSaga);
  yield takeLatest('GET_BOOKS', getBooks);
  yield takeLatest('POST_BOOK', postBook);
}

function* firstSaga(action) {
  console.log('firstSaga run:', action);
}

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

function* postBook(action) {
  try {
    yield put({ type: 'ERROR_RESET' });
    yield axios.post('/books', action.payload);
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

//
// Redux Setup
// ------------------------------

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
  // combines all of our reducer function to place in the store
  combineReducers({
    bookList,
    errorMessage,
  }),
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
