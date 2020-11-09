import { SAVE_RANKING } from '../actions/index';

const initialState = [];

function ranking(state = initialState,
  { type, playerAtual }) {
  switch (type) {
  case SAVE_RANKING:
    return [...state, playerAtual];
  default:
    return state;
  }
}

export default ranking;
