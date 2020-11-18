import { ADD_TOKEN } from '../actions/tokenAction';

const INITIAL_STATE = { token: '', date: '' };

const tokenReducer = (state = INITIAL_STATE, action) => {
  const { type, tokenObj } = action;
  switch (type) {
  case ADD_TOKEN:
    return { ...tokenObj };
  default:
    return state;
  }
};

export default tokenReducer;
