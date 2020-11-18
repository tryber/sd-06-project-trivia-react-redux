import { ADD_QUESTIONS } from '../actions/questionsAction';

const INITIAL_STATE = { questions: [] };

const questionsReducer = (state = INITIAL_STATE, action) => {
  const { type, questions } = action;
  switch (type) {
  case ADD_QUESTIONS:
    return { ...questions };
  default:
    return state;
  }
};

export default questionsReducer;
