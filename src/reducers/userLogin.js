import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  token: '',
  playerName: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      email: action.email,
      token: action.token,
      playerName: action.playerName };
  default:
    return state;
  }
}
