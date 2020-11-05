import { combineReducers } from 'redux';
import user from './user';
import game from './game';

const rootReducer = combineReducers({ user, game });

export default rootReducer;
