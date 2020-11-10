import { combineReducers } from 'redux';
import login from './login';
import token from './token';
import allQuestions from './allQuestions';

const rootReducer = combineReducers({
  login,
  token,
  allQuestions,
});

export default rootReducer;
