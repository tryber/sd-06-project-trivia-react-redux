import { LOGIN } from '../Action/actionLogin';
import { GET_TOKEN } from '../Action/actionToken';

const initialState = {
  name: '',
  email: '',
  token: '',
};

function reducerLogin(state = initialState, action) {
  switch (action.type) {

  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default: {
    return state;
  }
  }
}

export default reducerLogin;
