import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import gravatarReducer from './gravatar';

const rootReducers = combineReducers({
  loginReducer,
  tokenReducer,
  gravatarReducer,
});

export default rootReducers;
