import { SAVE_TIME_LEFT } from '../actions';

const initialState = {
  secondsLeft: 30,
};

function timer(state = initialState, action) {
  switch (action.state) {
  case SAVE_TIME_LEFT:
    return {
      ...state,
      secondsLeft: action.seconds,
    };
  default:
    return state;
  }
}

export default timer;
