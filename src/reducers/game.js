import { GET_API } from '../actions';

const initialState = {
  responseCode: '',
  results: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case GET_API: {
    const { answer } = action;
    return {
      ...initialState,
      responseCode: answer.response_code,
      results: answer.results,
    };
  }
  default:
    return state;
  }
}
