import { LOGIN, TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN: {
    const { name, email } = action.userData;
    return { ...state, name, email };
  }
  case TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
}
