import { HANDLE_USER, SAVE_ASSERTION, SAVE_SCORE } from '../actions';

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
  case SAVE_ASSERTION:
    return {
      ...state,
      assertions: action.assertions,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default userReducer;
