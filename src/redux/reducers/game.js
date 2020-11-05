import { QUESTIONS_SUCCESS } from '../actions';

const initialState = {
  questions: '',
};

function game(state = initialState, action) {
  switch (action.type) {
  case QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.data,
    };
  default:
    return state;
  }
}

export default game;
