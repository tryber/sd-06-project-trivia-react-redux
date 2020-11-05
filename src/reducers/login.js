import { PLAY } from '../actions';

const initialState = {
  player: {
    user: '',
    email: '',
  },
  token: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case PLAY:
    return {
      ...state,
      player: {
        ...state.player,
        user: action.user,
        email: action.email,
      },
      token: action.token,
    };
  default:
    return state;
  }
}
