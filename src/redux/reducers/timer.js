import { SAVE_TIME_LEFT, STOPWATCH } from '../actions';

const initialState = {
  seconds: 30,
  stopwatch: false,
};

function timer(state = initialState, action) {
  switch (action.type) {
  case SAVE_TIME_LEFT:
    return {
      // ...state,
      seconds: action.seconds,
    };
  case STOPWATCH:
    return {
      stopwatch: true,
    };
  default:
    return state;
  }
}

export default timer;
