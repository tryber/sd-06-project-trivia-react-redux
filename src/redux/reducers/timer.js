import { SAVE_TIME_LEFT } from '../actions';

const initialState = {
  seconds: 30,
};

function timer(state = initialState, action) {
  switch (action.type) {
  case SAVE_TIME_LEFT:
    return {
      // ...state,
      seconds: action.seconds,
    };
  default:
    return state;
  }
}

export default timer;
