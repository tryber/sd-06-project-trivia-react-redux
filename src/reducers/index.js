import { combineReducers } from 'redux';
import token from './token';
import ranking from './ranking';
import state from './state';

const rootReducer = combineReducers({ token, ranking, state });

export default rootReducer;
