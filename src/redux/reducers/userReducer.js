import { LOGIN } from '../actions';
import userInitialState from '../states/userState';

export default function userReducer(state = userInitialState, action) {
  switch (action.type) {
  case LOGIN:
    const { email, name, avatar } = action.payload;

    return { ...state, email, name, avatar };
  default:
    return state;
  }
}
