import { USER } from '../actions';

const INITIAL_STATE = {
  login: {
    name: '',
    email: '',
    hash: '',
    score: 0,
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      login: {
        name: action.payload.login.name,
        email: action.payload.login.email,
        hash: action.payload.login.hash,
        score: action.payload.login.hash,
      },
    };
  default:
    return state;
  }
}

export default user;
