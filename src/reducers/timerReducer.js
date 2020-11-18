import { ADD_TIMER, ADD_STOP } from '../actions/timerAction';

const INITIAL_STATE = { seconds: 30, stop: false };

const timerReducer = (state = INITIAL_STATE, action) => {
  const { type, seconds, stop } = action;
  switch (type) {
  case ADD_TIMER:
    return { ...state, seconds };
  case ADD_STOP:
    return { ...state, stop };
  default:
    return state;
  }
};

export default timerReducer;
