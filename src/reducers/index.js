import { combineReducers } from 'redux';
import login from './login';
import token from './token';
import allQuestions from './allQuestions';
import playerData from './playerData';

const rootReducer = combineReducers({
  login,
  token,
  allQuestions,
  playerData,

});

export default rootReducer;
