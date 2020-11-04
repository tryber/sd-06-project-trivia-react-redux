import { LOGIN } from '../actions';
import userInitialState from '../states/userState';

function handleLoginStateChange(state, action) {
  const { email, name, avatar } = action.payload;

  return { ...state, email, name, avatar };
}

export default function userReducer(state = userInitialState, action) {
  switch (action.type) {
  case LOGIN:
    return handleLoginStateChange(state, action);
  default:
    return state;
  }
}
