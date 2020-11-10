import { HANDLE_QUESTION, HANDLE_TIMER } from '../actions';

const INITIAL_STATE = {
  questions: [],
  timer: 30,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_QUESTION:
    return {
      ...state,
      questions: [...action.questions],
    };
  case HANDLE_TIMER:
    return {
      ...state,
      timer: state.timer - 1,
    };
  default:
    return state;
  }
};

export default gameReducer;
