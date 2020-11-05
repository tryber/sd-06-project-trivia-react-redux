import { LOGIN } from '../Action/actionLogin';

const initialState = {
  name: '',
  hash: '',
  score: 0,
  email: '',
};

function reducerLogin(state = initialState, action) {
  switch (action.type) {
  case LOGIN: return { ...state, hash: action.hash, name: action.name };

  default: return state;
  }
}
export default reducerLogin;
