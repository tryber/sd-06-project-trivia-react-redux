import { GET_TOKEN } from '../Action/actionToken';

const initialState = {
  token: '',
};

function tokenReducer(state = initialState, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}

export default tokenReducer;
