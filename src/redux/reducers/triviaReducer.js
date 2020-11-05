import triviaInitialState from '../states/triviaState';
import { GET_QUESTIONS } from '../actions';

function handleLoadingQuestions(state, action) {
  const { questions, token } = action.payload;

  return { ...state, questions, token };
}

export default function triviaReducer(state = triviaInitialState, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return handleLoadingQuestions(state, action);
  default:
    return state;
  }
}
