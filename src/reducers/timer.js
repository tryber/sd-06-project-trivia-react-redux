import { FREEZE_TIMER } from '../actions/index';

const INITIAL_STATE = {
  stopTimer: false,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FREEZE_TIMER:
    return { ...state, stopTimer: action.payload };
  default:
    return state;
  }
};

export default timerReducer;
