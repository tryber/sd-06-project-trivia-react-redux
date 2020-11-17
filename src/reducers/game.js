import {
  ADD_QUESTIONS,
  UPDATE_SCORE,
  RENDER_TIME,
  RESET_TIME,
  RESET_SCORE,
} from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  questions: [],
  difficulty: 'easy',
  timer: 30,
};

const game = (state = INITIAL_STATE, action) => {
  const maximumTime = 30;
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case RENDER_TIME:
    return { ...state, timer: state.timer - 1 };
  case RESET_TIME:
    return { ...state, timer: maximumTime };
  default:
    return state;
  }
};

export default game;
