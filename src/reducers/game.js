import { QUESTIONS, ASSERTIONS, SCORE, ADD_RANKING, RESET_GAME } from '../actions';

const INITIAL_STATE = {
  questions: '',
  assertions: 0,
  score: 0,
  ranking: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  case SCORE:
    return { ...state, score: action.score };
  case ASSERTIONS:
    return { ...state, assertions: action.assertions };
  case ADD_RANKING:
    return { ...state,
      ranking: [
        ...state.ranking,
        { name: action.name, score: state.score, picture: `https://www.gravatar.com/avatar/${action.hash}` },
      ] };
  case RESET_GAME:
    return { ...state, score: 0, assertions: 0 };
  default:
    return state;
  }
}
