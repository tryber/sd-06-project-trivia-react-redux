import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';

const rootReducer = combineReducers({ login, questions });

export default rootReducer;
