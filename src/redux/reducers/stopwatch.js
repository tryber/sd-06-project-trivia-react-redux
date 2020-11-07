import { STOPWATCH } from '../actions';

const initialState = {
  timerOn: true,
  timerStart: 30,
  timerTimer: 0,
};

function stopwatch(state = initialState, action) {
  switch (action.type) {
  case STOPWATCH:
    return {
      ...state,
      timerOn: action.data.timerOn,
      timerStart: action.data.timerStart,
      timerTimer: action.data.timeTimer,
    };
  default:
    return state;
  }
}

export default stopwatch;
