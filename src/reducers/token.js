// import reducers from ".";
import { REQUEST, DATA, DATA_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  token: '',
  error: '',
  questions: null,
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case DATA:
    return {
      isFetching: false,
      token: action.data,
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
