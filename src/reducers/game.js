import { GET_SCORE, ADD_QUESTIONS, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
  questions: [],
  difficulty: 'medium',
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
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    }
  default:
    return state;
  }
};

export default game;
