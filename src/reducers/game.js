import { GET_SCORE, ADD_QUESTIONS, RENDER_TIME } from '../actions';

const INITIAL_STATE = {
  score: 0,
  questions: [],
  timer: 30,
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
  case RENDER_TIME:
    return { ...state, timer: state.timer - 1 };
  default:
    return state;
  }
};

export default game;
