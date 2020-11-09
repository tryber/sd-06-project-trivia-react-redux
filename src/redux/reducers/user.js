import md5 from 'crypto-js/md5';
import { SCORE_PLAYER, SCORE_RESET, USER } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    picture: '',
    assertions: 0,
    score: 0,
  },
};

function currentAssertions(state) {
  return state.player.assertions + 1;
}

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.player.name,
        gravatarEmail: action.payload.player.email,
        picture: `https://www.gravatar.com/avatar/${md5(action.payload.player.email).toString()}`,
      },
    };
  case SCORE_PLAYER:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload.score,
        assertions: currentAssertions(state, action),
      },
    };
  case SCORE_RESET:
    return {
      ...state,
      player: {
        ...state.player,
        score: 0,
        assertions: 0,
      },
    };
  default:
    return state;
  }
}

export default user;
