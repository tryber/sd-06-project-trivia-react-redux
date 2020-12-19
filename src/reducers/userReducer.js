import { SEND_LOGIN, SEND_SCORE, SEND_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_LOGIN:
    return { ...state, email: action.email, name: action.name };
  case SEND_SCORE:
    return { ...state, score: action.score };
  case SEND_ASSERTIONS:
    return { ...state, assertions: action.assertions };
  default:
    return state;
  }
}

export default reducer;
