import { combineReducers } from 'redux';
import login from './login';
import tokenReduce from './token';

const rootReducer = combineReducers({
  login,
  tokenReduce,
});

export default rootReducer;
