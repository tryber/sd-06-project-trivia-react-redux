import { TOKEN } from '../actions';

const INITIAL_STATE = {
  response: {},
};

const tokenReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      response: action.payload,
    };
  default:
    return state;
  }
};

export default tokenReduce;
