import { TOKEN_SUCCESS } from '../actions';

const initialState = {
  token: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case TOKEN_SUCCESS:
    return {
      ...state,
      token: action.data
    }
  default:
    return state;
  }
}

export default user;
