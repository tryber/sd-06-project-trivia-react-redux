import { TOKEN_SUCCESS, SAVE_PLAYER_DATA, TOKEN_REQUEST, PLAYER_SCORE } from '../actions';

const initialState = {
  tokenResponse: '',
  name: '',
  email: '',
  loading: true,
  score: 0,
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
      tokenResponse: action.data,
      loading: action.loading,
    };
  case TOKEN_REQUEST:
    return {
      ...state,
      loading: action.loading,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
}

export default user;
