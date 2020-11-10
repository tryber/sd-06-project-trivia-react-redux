import { CORRECT_ANSWER, QUESTIONS_SUCCESS, PLAY_AGAIN } from '../actions';

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
    };
  case PLAY_AGAIN:
    return initialState;
  default:
    return state;
  }
}

export default game;
