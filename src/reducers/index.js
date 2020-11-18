import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';

export default combineReducers({
  player: playerReducer,
  tokenObj: tokenReducer,
  questions: questionsReducer,
  timer: timerReducer,
});
