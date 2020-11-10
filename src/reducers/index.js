import { combineReducers } from 'redux';
import player from './player';
import requestInfo from './requestInfo';
import ranking from './ranking';

const rootReducer = combineReducers({ player, requestInfo, ranking });

export default rootReducer;
