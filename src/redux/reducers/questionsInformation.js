import { loadState } from '../../services/localStorage';
import { ADD_QUESTIONS, SCORE_RANKING } from '../actions';

const INITIAL_STATE = {
  arrayQuestion: [],
  ranking: loadState('ranking', []),
};

function questionsInformation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, arrayQuestion: [...action.payload.questionsResults] };
  case SCORE_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, action.payload],
    };
  default:
    return state;
  }
}

export default questionsInformation;
