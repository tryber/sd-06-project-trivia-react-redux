import { combineReducers } from 'redux';
import player from './player';
import game from './game';

const rootReducers = combineReducers({
  player,
  game,
});

export default rootReducers;
