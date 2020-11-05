import { SAVE_USER, REQUEST_FETCH_API, RECEIVED_RESPONSE_API } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case REQUEST_FETCH_API:
    return {
      ...state,
      isfetching: true,
    };
  case RECEIVED_RESPONSE_API:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}

export default userReducer;
