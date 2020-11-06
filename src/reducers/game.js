import { QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case QUESTIONS:
      return { ...state, questions: action.questions };
    default:
      return state;
  }
}
