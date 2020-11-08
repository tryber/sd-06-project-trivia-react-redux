import { HANDLE_USER, HANDLE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  assertions: 0,
  score: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case HANDLE_SCORE:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  default:
    return state;
  }
};

export default userReducer;
