import { SAVE_RANKING, LOAD_RANKING } from '../actions/index';

const initialState = [];

function ranking(state = initialState,
  { type, playerAtual, localStoreRanking }) {
  switch (type) {
  case SAVE_RANKING:
    return [...state, playerAtual];
  case LOAD_RANKING:
    return [...localStoreRanking];
  default:
    return state;
  }
}

export default ranking;
