import { HASH, USER, SCORE, CORRECT } from '../actions';

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
  case HASH:
    return {...state, hash:action.hash}

  case SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.score,
      },
    };
  case CORRECT:
    return {
      ...state,
      player: {
        ...state.player,
        correct: action.correct
      },
    };
  default:
    return state;
  }
}
