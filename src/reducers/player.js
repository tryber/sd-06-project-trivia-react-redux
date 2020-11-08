import { SAVE_NAME_EMAIL, SAVE_GAME_SCORE } from '../actions/index';

const initialState = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

function player(state = initialState,
  { type, name, gravatarEmail, score, assertions }) {
  switch (type) {
  case SAVE_NAME_EMAIL:
    return { ...state, name, gravatarEmail };
  case SAVE_GAME_SCORE:
    return { ...state, score, assertions };
  default:
    return state;
  }
}

export default player;
