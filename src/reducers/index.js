import { combineReducers } from 'redux';
import token from './token';
import ranking from './ranking';
import state from './state';
import questions from './questions';

const rootReducer = combineReducers({ token, ranking, state, questions });

export default rootReducer;
