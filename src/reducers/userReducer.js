import { SEND_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_LOGIN:
    return { ...state, email: action.email, name: action.name };
  default:
    return state;
  }
}

export default reducer;
