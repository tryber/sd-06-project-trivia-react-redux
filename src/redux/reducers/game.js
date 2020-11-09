import { CORRECT_ANSWER, QUESTIONS_SUCCESS } from '../actions';

const initialState = {
  questions: '',
  correctAnswers: 0,
};

function game(state = initialState, action) {
  switch (action.type) {
  case QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.data,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      correctAnswers: state.correctAnswers + action.amount,
    }
  default:
    return state;
  }
}

export default game;
