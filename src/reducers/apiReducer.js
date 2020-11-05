import { FETCH_TOKEN, FETCH_TOKEN_SUCESS, FETCH_TOKEN_ERROR } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
    };
  case FETCH_TOKEN_SUCESS:
    localStorage.setItem('token', JSON.stringify(action.token));
    return {
      ...state,
      token: action.token,
    };
  case FETCH_TOKEN_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default apiReducer;
