import { TOKEN_REQUEST } from '../actions';

const INITIAL_STATE = {
  token: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN_REQUEST:
    return {
      ...state, token: action.token,
    };
  default:
    return state;
  }
}
