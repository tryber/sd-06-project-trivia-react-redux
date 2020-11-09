import { TIME_FINISHED } from '../actions';

const INITIAL_STATE = {
  timeQuestion: '',
};

function timerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIME_FINISHED:
    return {
      ...state,
      timeQuestion: action.timeQuestion,
    };
  default:
    return state;
  }
}

export default timerReducer;
