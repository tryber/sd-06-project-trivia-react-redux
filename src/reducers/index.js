import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';

const rootReducers = combineReducers({
  loginReducer,
  tokenReducer,
});

export default rootReducers;
