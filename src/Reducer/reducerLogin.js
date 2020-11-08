import { LOGIN } from '../Action/actionLogin';
import { GET_TOKEN } from '../Action/actionToken';
import { UPDATE_SCORE } from '../Action/actionUpdateScore';

const initialState = {
  hash: '',
  player: {
    score: 0,
    gravatarEmail: '',
    name: '',
    assertions: 0,
  },
  token: '',
};

function reducerLogin(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      hash: action.hash,
      player: { ...state.player, ...action.player },
    };
  case GET_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      hash: action.hash,
      player: { ...state.player, ...action.player },
    };
  default: {
    return state;
  }
  }
}

export default reducerLogin;
