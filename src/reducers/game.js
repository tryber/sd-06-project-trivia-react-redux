<<<<<<< HEAD
import { GET_SCORE, ADD_QUESTIONS, UPDATE_SCORE } from '../actions';
=======
import { GET_SCORE, ADD_QUESTIONS, RENDER_TIME } from '../actions';
>>>>>>> f6bf26fa3368ebe7ca7033794ec619f3d767d316

const INITIAL_STATE = {
  score: 0,
  questions: [],
<<<<<<< HEAD
  difficulty: 'medium',
=======
  timer: 30,
>>>>>>> f6bf26fa3368ebe7ca7033794ec619f3d767d316
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
<<<<<<< HEAD
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    }
=======
  case RENDER_TIME:
    return { ...state, timer: state.timer - 1 };
>>>>>>> f6bf26fa3368ebe7ca7033794ec619f3d767d316
  default:
    return state;
  }
};

export default game;
