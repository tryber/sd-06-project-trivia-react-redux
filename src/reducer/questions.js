import { HANDLE_QUESTION, HANDLE_LESS_TIMER, HANDLE_STOP_TIMER } from '../actions';

const INITIAL_STATE = {
  questions: [],
  timer: 30,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_QUESTION:
    return {
      ...state,
      questions: [...action.questions],
    };
  case HANDLE_LESS_TIMER:
    return {
      ...state,
      timer: action.timer - 1,
    };
  case HANDLE_STOP_TIMER:
    return {
      ...state,
      timer: action.timer,
    };
  default:
    return state;
  }
};

export default questionReducer;
