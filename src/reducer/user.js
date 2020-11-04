import { HANDLE_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  avatar: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_USER:
    return {
      ...state,
      name: action.email,
      avatar: action.avatar,
    };
  default:
    return state;
  }
};

export default userReducer;
