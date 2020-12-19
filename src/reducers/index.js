import { combineReducers } from 'redux';
import userLogin from './userLogin';
import questions from './questions';

export default combineReducers({
  userLogin,
  questions,
});
