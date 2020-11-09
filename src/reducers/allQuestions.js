import { GET_QUESTIONS, SCORED_POINT } from '../actions';

const INITIAL_STATE = {
  results: [],
  score: 0,
  assertions: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, results: action.payload.results };
  case SCORED_POINT:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}
