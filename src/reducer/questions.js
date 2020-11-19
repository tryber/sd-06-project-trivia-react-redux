const INITIAL_STATE = {
  questionsArray: [],
};

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ATT_QUESTIONS':
    return {
      ...state,
      questionsArray: [...action.questionsArray],
    };
  default:
    return state;
  }
}
