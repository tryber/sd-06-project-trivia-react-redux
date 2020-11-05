import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
