import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import game from './game';

const rootReducer = combineReducers({ user, token, game });

export default rootReducer;
