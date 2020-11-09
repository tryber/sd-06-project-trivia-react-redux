import { QUESTIONS, SUM_POINTS } from '../actions';

const INITIAL_STATE = {
  results: [],
  score: [],
  hits: 0,
};

function points(state = INITIAL_STATE, action) {
  switch (action.type) {
    case QUESTIONS:
      return { ...state, results: action.results.results };
    case SUM_POINTS:
      return {
        ...state,
        score: state.score + action.score,
        hits: state.hits + 1,
      }
    default:
      return state;
  }
}

export default points;
