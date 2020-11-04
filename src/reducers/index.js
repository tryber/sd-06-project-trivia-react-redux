import { combineReducers } from 'redux';

const INITIAL_STATE = { nada: 'nada' };

export const reducer = (state = INITIAL_STATE, action) => {
  return state;
}

const rootReducers = combineReducers({ reducer });

export default rootReducers;
