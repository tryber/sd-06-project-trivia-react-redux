import { QUESTION_LIST } from '../actions';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTION_LIST:
    return [...state, ...action.questions];
  default:
    return state;
  }
}
