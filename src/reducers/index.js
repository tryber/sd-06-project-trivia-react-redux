import { combineReducers } from 'redux';
import login from './login';
import game from './game';

const rootReducer = combineReducers({
  login,
  game,
});

export default rootReducer;
