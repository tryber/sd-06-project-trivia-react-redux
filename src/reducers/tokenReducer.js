import {
  REQUESTING_TOKEN,
  FOUND_TOKEN,
  TOKEN_NOT_FOUND,
} from '../actions/actionsFetchToken';

const INICIAL_STATE = {
  isFetching1: false,
  token: '',
  error1: '',
};

const tokenReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUESTING_TOKEN:
    return { ...state, isFetching1: true };
  case FOUND_TOKEN:
    return { ...state, token: action.token, isFetching1: false };
  case TOKEN_NOT_FOUND:
    return { ...state, error1: action.error, isFetching1: false };
  default:
    return state;
  }
};

export default tokenReducer;
