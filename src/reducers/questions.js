import { QUESTION_LIST } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTION_LIST:
    return {
      ...state,
      questions: [...state.questions, action.questions],
    };
  default:
    return state;
  }
}
