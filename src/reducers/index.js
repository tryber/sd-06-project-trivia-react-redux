import { combineReducers } from 'redux';
import login from './login';
import token from './token';
import allQuestions from './allQuestions';
import ranking from './ranking';

const rootReducer = combineReducers({
  login,
  token,
  allQuestions,
  ranking,
});

export default rootReducer;
