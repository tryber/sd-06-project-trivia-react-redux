import { USER_INFO, USER_SCORE, USER_CLEAR } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.name,
        gravatarEmail: action.email,
      },
    };
  case USER_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.score,
        assertions: state.player.assertions + 1,
      },
    };
  case USER_CLEAR:
    return INITIAL_STATE;
  default:
    return state;
  }
}
