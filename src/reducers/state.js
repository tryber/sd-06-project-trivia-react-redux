import { USER_INFO, USER_SCORE } from '../actions';

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
        score: action.score,
        assertions: action.assertions,
      },
    };
  default:
    return state;
  }
}
