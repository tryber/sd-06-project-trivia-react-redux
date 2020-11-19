import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';
import player from './player';

const rootReducer = combineReducers({ login, questions, player });

export default rootReducer;
