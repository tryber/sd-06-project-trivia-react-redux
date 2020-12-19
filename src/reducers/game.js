import { ADD_RESULT } from '../actions/game';

const initialState = {
  results: {
    assertions: 0,
    score: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ADD_RESULT:
    return {
      ...state, results: { ...state.results, ...action.result },
    };
  default:
    return state;
  }
}
