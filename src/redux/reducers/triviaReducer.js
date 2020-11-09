import triviaInitialState from '../states/triviaState';
import { GET_QUESTIONS, CONFIG } from '../actions';

function handleLoadingQuestions(state, action) {
  const { questions, token } = action.payload;

  return { ...state, questions, token };
}

function handleSettingsUpdate(state, action) {
  const { config } = action.payload;

  return { ...state, config };
}

export default function triviaReducer(state = triviaInitialState, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return handleLoadingQuestions(state, action);
  case CONFIG:
    return handleSettingsUpdate(state, action);
  default:
    return state;
  }
}
