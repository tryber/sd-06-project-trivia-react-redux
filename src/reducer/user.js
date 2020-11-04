import { HANDLE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  avatar: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_USER:
    return {
      ...state,
      email: action.email,
      avatar: action.avatar,
    };
  default:
    return state;
  }
};

export default userReducer;
