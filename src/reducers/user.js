const INITIAL_STATE = { token: '' };
const TOKEN = 'TOKEN';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
}
