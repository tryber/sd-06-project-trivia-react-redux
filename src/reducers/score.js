import { SCORE } from '../actions/index';

const INITIAL_STATE = { userScore: '' };

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE:
    return { ...state, userScore: action.payload };
  default:
    return state;
  }
};

export default scoreReducer;
