const INITIAL_STATE = {
  email: '',
  name: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
}
