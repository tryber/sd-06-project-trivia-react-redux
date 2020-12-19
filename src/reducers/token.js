import { TOKEN } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
};

export default tokenReducer;
