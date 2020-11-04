import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default login;
