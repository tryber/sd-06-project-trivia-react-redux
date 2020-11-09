import { QUESTIONS_SUCCESS } from '../actions';

const initialState = {
  questions: '',
  shuffledAnswers: [],
  shuffled: false,
  disabledBtns: false,
  renderNextQuestionBtn: false,
};

function trivia(state = initialState, action) {
  switch (action.type) {
  case QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.data,
    };
  case 'SAVE_SHUFFLED_ANSWERS':
    return {
      ...state,
      shuffledAnswers: action.shuffledAnswers,
      shuffled: !state.shuffled,
    };
  case 'TOGGLE_SHUFFLED':
    return {
      ...state,
      shuffled: !state.shuffled,
    };
  case 'TOGGLE_BUTTONS':
    return {
      ...state,
      disabledBtns: !state.disabledBtns,
    };
  case 'TOGGLE_NEXT_QUESTION':
    return {
      ...state,
      renderNextQuestionBtn: !state.renderNextQuestionBtn,
    };
  default:
    return state;
  }
}

export default trivia;
