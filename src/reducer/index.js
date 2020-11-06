import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';

const rootReducer = combineReducers({
  user,
  questions,
});

export default rootReducer;
