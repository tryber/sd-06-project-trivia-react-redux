import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import ranking from './ranking';

const rootReducer = combineReducers({
  login,
  game,
  ranking,
});

export default rootReducer;
