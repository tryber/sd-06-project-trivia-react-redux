import { combineReducers } from 'redux';
import login from './login';
import tokenReduce from './token';
import playerData from './playerData';

const rootReducer = combineReducers({
  login,
  tokenReduce,
  playerData,
});

export default rootReducer;
