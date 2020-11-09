import md5 from 'crypto-js/md5';
import { loadState } from '../../services/localStorage';
import { SCORE_PLAYER, USER } from '../actions';

const INITIAL_STATE = {
  // ...loadState('state', {
    player: {
      name: '',
      gravatarEmail: '',
      picture: '',
      assertions: 0,
      score: 0,
    },
  // }),
};

// function funcAleatoria(state, action) {
// }

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
        assertions: action.payload.assertions,
        // assertions: funcAleatoria(state, action),
      },
    };
  default:
    return state;
  }
}

export default user;
