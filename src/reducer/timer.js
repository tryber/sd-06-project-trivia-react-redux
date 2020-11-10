import { HANDLE_LESS_TIMER, HANDLE_STOP_TIMER, HANDLE_RESET_TIMER } from '../actions';

const INITIAL_STATE = 30;

const timerReducer = (state = INITIAL_STATE, action) => {
  const reset = 30;
  switch (action.type) {
  case HANDLE_LESS_TIMER:
    return state - 1;
  case HANDLE_STOP_TIMER:
    return state;
  case HANDLE_RESET_TIMER:
    return reset;
  default:
    return state;
  }
};

export default timerReducer;
