const INITIAL_STATE = {
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch(action.type) {
  case 'ADD_QUESTIONS':
    return { ...state, questions: action.questions }
  default:
    return state;
  }
}

export default game;
