import { TOKEN } from '../actions';

const INITIAL_STATE = {
  response: {
    response_code: 0,
    response_message: true,
    token: '',
  },
};

const tokenReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      response: { token: action.token },
    };
  default:
    return state;
  }
};

export default tokenReduce;
