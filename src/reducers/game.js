import {
  TIME_OVER,
} from '../actions';

const INITIAL_STATE = {
  time: 30,
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIME_OVER:
    return {
      ...state,
      time: action.time,
    };
  default:
    return state;
  }
}
