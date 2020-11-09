import { HANDLE_QUESTION } from '../actions';

const INITIAL_STATE = [];

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_QUESTION:
    return {
      ...state,
      ...action.questions,
    };
  default:
    return state;
  }
};

export default questionReducer;
