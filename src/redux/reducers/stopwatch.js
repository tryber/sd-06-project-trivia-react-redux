import { SAVE_TIME_LEFT } from '../actions';

const initialState = {
  seconds: 30,
  clock: true,
};

function stopwatch(state = initialState, action) {
  switch (action.type) {
  case SAVE_TIME_LEFT:
    return {
      ...state,
      seconds: action.seconds,
    };
  case 'TOGGLE_STOPWATCH':
    return {
      ...state,
      seconds: 30,
      clock: !state.clock,
    };
  default:
    return state;
  }
}

export default stopwatch;
