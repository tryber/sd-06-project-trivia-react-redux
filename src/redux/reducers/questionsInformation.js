import { ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  arrayQuestion: [],
};

function questionsInformation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, arrayQuestion: [...action.payload.questionsResults] };
  default:
    return state;
  }
}

export default questionsInformation;
