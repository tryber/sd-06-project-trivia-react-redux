import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import timer from './timer';

const rootReducer = combineReducers({ timer, user, game });

export default rootReducer;
