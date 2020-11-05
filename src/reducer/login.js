const INITIAL_STATE = {
  email: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
