import { QUESTIONS_SUCCESS, SCORE } from '../actions';

const initialState = {
  questions: '',
  score: 0,
  // questionNumber: 0,
};

function game(state = initialState, action) {
  switch (action.type) {
  case QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.data,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  // case SAVE_QUESTION:
  //   return {
  //     ...state,
  //     questionNumber: action.question,
  //   };
  default:
    return state;
  }
}

export default game;
