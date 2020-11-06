import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: [action.fetchedQuestions],
    };
  default:
    return state;
  }
}
