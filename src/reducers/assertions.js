import { ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case ASSERTIONS:
    return { ...state, assertions: action.assertions };
  default:
    return state;
  }
}
