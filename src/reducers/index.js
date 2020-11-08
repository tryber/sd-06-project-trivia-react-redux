import { combineReducers } from 'redux';
import player from './player';
import requestInfo from './requestInfo';

const rootReducer = combineReducers({ player, requestInfo });

export default rootReducer;
