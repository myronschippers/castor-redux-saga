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
  yield takeEvery('FIRST_SAGA', firstSaga);
}

function* firstSaga(action) {
  console.log('firstSaga run:', action);
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
