import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';
import rankingReducer from './rankingReducer';
import settingsReducer from './settingsReducer';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
  player: playerReducer,
  tokenObj: tokenReducer,
  questions: questionsReducer,
  timer: timerReducer,
  ranking: rankingReducer,
  settings: settingsReducer,
  authenticationStatus: authenticationReducer,
});
