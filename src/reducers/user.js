import { SCORE, USER } from '../actions';

const INITIAL_STATE = { token: '' };
const TOKEN = 'TOKEN';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return { ...state, token: action.token };
  case USER:
    return {
      ...state,
      player: {
        name: action.name,
      },
    };
  case SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.score,
      },
    };
  default:
    return state;
  }
}
