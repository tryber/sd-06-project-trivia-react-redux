import ADD_RESULT from '../actions/game';

const initialState = {
  results: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ADD_RESULT:
    return {
      ...state, results: [...state.results, ...action.results],
    };
  default:
    return state;
  }
}
