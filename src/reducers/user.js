import { PLAYER_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_NAME:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
