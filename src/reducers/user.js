import { LOGIN, TOKEN, SCORE, ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  token: '',
  assertions: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN: {
    const { name, email } = action.userData;
    return { ...state, name, email };
  }
  case TOKEN:
    return { ...state, token: action.token };
  case SCORE:
    return { ...state, score: action.score };
  case ASSERTIONS:
    return { ...state, score: action.assertions };
  default:
    return state;
  }
}
