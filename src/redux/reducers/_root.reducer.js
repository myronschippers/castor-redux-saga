import { combineReducers } from 'redux';

// REDUCERS
import bookList from './bookList.reducer';
import errorMessage from './errorMessage.reducer';

const reducers = combineReducers({
  bookList,
  errorMessage,
});

export default reducers;
