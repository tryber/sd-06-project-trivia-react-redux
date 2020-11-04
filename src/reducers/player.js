import { UPDATE_PLAYER_TOKEN } from '../actions';

const INITIAL_STATE = { token: '' };

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_PLAYER_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  };
}

export default player;
