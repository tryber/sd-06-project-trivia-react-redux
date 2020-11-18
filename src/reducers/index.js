import { combineReducers } from 'redux';
import player from './player';
import game from './game';
import settings from './settings';

const rootReducer = combineReducers({
  player,
  game,
  settings,
});

export default rootReducer;
