const INITIAL_STATE = {
  question: {},
};

export default function questionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TOKEN_QUESTION':
    return {
      ...state,
      question: action.question,
    };
  default:
    return state;
  }
}
