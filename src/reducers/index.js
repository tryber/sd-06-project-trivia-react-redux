import { combineReducers } from 'redux';
import user from './user';
import game from './game';

const reducer = combineReducers({ user, game });

export default reducer;
