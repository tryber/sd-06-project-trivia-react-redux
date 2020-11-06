import { PLAY } from '../actions';

const initialState = {
  player: {
    user: '',
    email: '',
  },
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
    };
  default:
    return state;
  }
}
