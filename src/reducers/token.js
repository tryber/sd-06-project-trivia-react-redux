import { USER_HASH, USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  hash: '',
  token: '',
};

function gravatar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_HASH:
    return { ...state, hash: action.hash };
  case USER_TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
}

export default gravatar;
