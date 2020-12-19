import { TIMER_RESET, TIMER_STOP, TIMER_START, TIMER_LOST } from '../actions';

const initialState = {
  stopTime: false,
  resetTime: true,
  startTime: false,
  lostTime: false,
};

function timer(state = initialState, action) {
  switch (action.type) {
  case TIMER_RESET:
    return {
      ...state,
      stopTime: action.stopCount,
      resetTime: action.resetCount,
      startTime: action.startCount,
    };
  case TIMER_STOP:
    return {
      ...state,
      stopTime: action.stopCount,
      resetTime: action.resetCount,
      startTime: action.startCount,
    };
  case TIMER_START:
    return {
      ...state,
      stopTime: action.stopCount,
      resetTime: action.resetCount,
      startTime: action.startCount,
    };
  case TIMER_LOST:
    return {
      ...state,
      lostTime: true,
    };
  default:
    return state;
  }
}

export default timer;
