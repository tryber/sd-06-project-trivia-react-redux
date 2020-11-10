import { SAVE_QUESTIONS, CLEAR_QUESTIONS } from '../actions';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return [...state, ...action.fetchedQuestions];
  case CLEAR_QUESTIONS:
    return INITIAL_STATE;
  default:
    return state;
  }
}
