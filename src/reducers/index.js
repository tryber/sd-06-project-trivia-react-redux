import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import questionReducer from './questions';
import gravatarReducer from './gravatar';

const rootReducers = combineReducers({
  loginReducer,
  tokenReducer,
  questionReducer,
  gravatarReducer,
});

export default rootReducers;
