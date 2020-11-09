import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import questionReducer from './questions';
import gravatarReducer from './gravatar';
import pointsReducer from './points';

const rootReducers = combineReducers({
  loginReducer,
  tokenReducer,
  questionReducer,
  gravatarReducer,
  pointsReducer,
});

export default rootReducers;
