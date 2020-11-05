import { SAVE_PLAYER_INFO, SAVE_SCORE } from '../actions/index';

const initialState = {
  name: '',
  email: '',
  hash: '',
  score: 0,
};

function playerInfoReducer(state = initialState, { type, name, email, hash, score }) {
  switch (type) {
  case SAVE_PLAYER_INFO:
    return { ...state, name, email, hash };
  case SAVE_SCORE:
    return { ...state, score };
  default:
    return state;
  }
}

export default playerInfoReducer;
