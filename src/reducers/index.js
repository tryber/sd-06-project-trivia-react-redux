import { combineReducers } from 'redux';
import game from './game';
import player from './player';

const rootReducers = combineReducers({ player, game });

export default rootReducers;
