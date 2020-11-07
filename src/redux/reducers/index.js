import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import timer from './timer';
import stopwatch from './stopwatch';

const rootReducer = combineReducers({ user, game, timer, stopwatch });

export default rootReducer;
