import { TOKEN_SUCCESS, SAVE_PLAYER_DATA } from '../actions';

const initialState = {
  token: '',
  name: '',
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case SAVE_PLAYER_DATA:
    return {
      ...state,
      name: action.data.name,
      email: action.data.email,
    };
  case TOKEN_SUCCESS:
    return {
      ...state,
      token: action.data,
    };
  default:
    return state;
  }
}

export default user;
