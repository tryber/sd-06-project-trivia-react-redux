import { RECEIVE_HASH } from '../actions';

const INITIAL_STATE = {
  hash: '',
};

function hashReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_HASH:
    return {
      ...state,
      hash: action.hash,
    };
  default:
    return state;
  }
}

export default hashReducer;
