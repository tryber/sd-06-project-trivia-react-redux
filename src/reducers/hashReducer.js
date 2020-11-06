import { RECEIVE_HASH } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  hash: '',
};

const hashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_HASH:
    return { ...state, hash: action.hash, isFetching: f };
  default:
    return state;
  }
};

export default hashReducer;
