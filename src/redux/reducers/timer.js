import { TIMER_START, TIMER_STOP, TIMER_RESET } from '../actions';

const initialState = {
  startedAt: undefined,
  stoppedAt: undefined,
  baseTime: undefined
};

function timer(state = initialState, action) {
  switch (action.type) {
  case TIMER_START:
    return {
      ...state,
      baseTime: action.baseTime,
      startedAt: action.now,
      stoppedAt: undefined,
    };
  case TIMER_STOP:
    return {
      ...state,
      stoppedAt: action.now,
    };
  case TIMER_RESET:
  return {
    ...state,
    baseTime: 0,
    startedAt: state.startedAt ? action.now : undefined,
    stoppedAt: state.stoppedAt ? action.now : undefined
  };
  default:
    return state;
  }
}

export default timer;