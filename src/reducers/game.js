import { GET_SCORE, ADD_QUESTIONS, UPDATE_LOADING } from '../actions';

const INITIAL_STATE = {
  score: 0,
  loading: true,
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case UPDATE_LOADING:
    return { ...state, loading: action.loading };
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
