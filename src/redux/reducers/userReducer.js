import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
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
