import { ADD_QUESTIONS, SCORE } from '../actions';

const INITIAL_STATE = {
  arrayQuestion: [],
  score: 0,
};

function questionsInformation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, arrayQuestion: [...action.payload.questionsResults] };
  case SCORE:
    return {
      ...state,
      score: parseInt((state.score), 10) + parseInt((action.payload.score), 10),
    };
  default:
    return state;
  }
}

export default questionsInformation;
