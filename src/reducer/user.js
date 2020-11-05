import { HANDLE_USER, HANDLE_AVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  avatar: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_USER:
    return {
      ...state,
      name: action.name,
    };
  case HANDLE_AVATAR:
    return {
      ...state,
      avatar: action.avatar,
    };
  default:
    return state;
  }
};

export default userReducer;
