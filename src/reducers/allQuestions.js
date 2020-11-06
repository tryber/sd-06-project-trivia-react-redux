import { GET_QUESTIONS, REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  results: [],
  isFetching: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return { ...state, ...action.payload, isFetching: false };
  default:
    return state;
  }
}
