import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import timer from './timer';

const rootReducer = combineReducers({ user, game, timer });

export default rootReducer;
