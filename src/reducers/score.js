import { SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
}
