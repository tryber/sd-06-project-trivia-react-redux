import { GET_SCORE } from '../actions';

const INITIAL_STATE = {
  score:  0,
};

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default scoreReducer;
