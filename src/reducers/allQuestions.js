import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}
