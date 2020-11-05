import { GET_SCORE, ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  score: 0,
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default game;
