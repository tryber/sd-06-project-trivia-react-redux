import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';
import stopwatch from './stopwatch';

const rootReducer = combineReducers({ user, trivia, stopwatch });

export default rootReducer;
