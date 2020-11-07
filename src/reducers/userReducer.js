import { SEND_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_LOGIN:
    return { ...state, email: action.email, name: action.name };
  case 'SEND_SCORE':
    return { ...state, score: action.score };
  default:
    return state;
  }
}

export default reducer;
