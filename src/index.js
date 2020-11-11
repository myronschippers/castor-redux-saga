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
import { takeEvery, takeLatest } from 'redux-saga/effects';
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

//
// Saga Functions
// ------------------------------

function* watcherSaga() {
  // register all sagas
  yield takeLatest('FIRST_SAGA', firstSaga);
  yield takeLatest('GET_BOOKS', getBooks);
}

function* firstSaga(action) {
  console.log('firstSaga run:', action);
}

function* getBooks(action) {
  try {
    const response = yield axios.get('/books');
    console.log(response.data);
  } catch (err) {
    console.log(err);
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

//
// Redux Setup
// ------------------------------

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
  // combines all of our reducer function to place in the store
  combineReducers({
    bookList,
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
