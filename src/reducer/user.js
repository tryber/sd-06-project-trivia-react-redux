import { HANDLE_USER, HANDLE_ASSERTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  assertions: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case HANDLE_ASSERTION:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default userReducer;
