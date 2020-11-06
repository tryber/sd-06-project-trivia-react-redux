import { USER } from '../actions';

const INITIAL_STATE = { token: '' };
const TOKEN = 'TOKEN';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return { ...state, token: action.token };
  case USER:
    return { ...state, user: action.name };
  default:
    return state;
  }
}
