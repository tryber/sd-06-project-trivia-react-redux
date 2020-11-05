import { combineReducers } from 'redux';
import login from './login';
import token from './token';

const rootReducer = combineReducers({
  login,
  token,
});

export default rootReducer;
