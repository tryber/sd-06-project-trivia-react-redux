const INITIAL_STATE = {
  email: '',
  token: '',
}

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      email: action.email,
      token: action.token,
    };
  default:
    return state;
  }
}
