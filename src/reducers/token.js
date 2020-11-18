import { REQUEST, DATA_TOKEN, DATA_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  token: '',
  questions: [],
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case DATA_TOKEN:
    return {
      isFetching: false,
      token: action.token,
    };
  case DATA_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      questions: action.questions,
    };
  default:
    return state;
  }
}

export default tokenReducer;
