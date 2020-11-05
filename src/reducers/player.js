import { UPDATE_PLAYER_TOKEN, LOGIN } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_PLAYER_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case LOGIN:
    return { ...state, name: action.name, gravatarEmail: action.email };
  default:
    return state;
  }
};

export default player;
