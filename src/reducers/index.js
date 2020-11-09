import { combineReducers } from 'redux';
import player from './player';
import game from './game';

const rootReducer = combineReducers({
  player,
  game,
});

export default rootReducer;
