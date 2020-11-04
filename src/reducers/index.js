import {
  SAVE_TOKEN,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  ranking: '',
  token: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}
