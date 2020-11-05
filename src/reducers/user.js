import { PLAY_GAME } from '../actions';

const initialState = {
  player: {
    email: '',
    name: '',
  },
  token: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case PLAY_GAME: {
    const { email, name, token } = action;
    return {
      ...state,
      player: { ...state.player, email, name },
      token,
    };
  }
  default:
    return state;
  }
}
