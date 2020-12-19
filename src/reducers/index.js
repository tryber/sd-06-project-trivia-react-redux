import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import questionReducer from './questions';
import gravatarReducer from './gravatar';
import timerReducer from './timer';
import scoreReducer from './score';

const rootReducers = combineReducers({
  loginReducer,
  tokenReducer,
  questionReducer,
  gravatarReducer,
  timerReducer,
  scoreReducer,
});

export default rootReducers;
