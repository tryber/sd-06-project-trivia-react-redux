import { QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  default:
    return state;
  }
};

export default questionReducer;
