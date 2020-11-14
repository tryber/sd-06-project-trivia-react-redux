import { PLAYER_NAME, NEXT_QUESTION, GIVE_ANSWER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  answered: false,
  assertions: 0,
  score: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_NAME:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case NEXT_QUESTION:
    return {
      ...state, answered: false,
    };
  case GIVE_ANSWER:
    return {
      ...state, answered: true,
    };
  default:
    return state;
  }
}

export default userReducer;
