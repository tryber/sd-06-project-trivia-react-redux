import { combineReducers } from 'redux';

const INITIAL_STATE = { nada: 'nada' };

export const reducer = (state = INITIAL_STATE) => state;

const rootReducers = combineReducers({ reducer });

export default rootReducers;
