import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import timer from './timer';

const rootReducer = combineReducers({
  user,
  questions,
  timer,
});

export default rootReducer;
