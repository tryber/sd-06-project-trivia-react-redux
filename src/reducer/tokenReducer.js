import { SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

export default function tokenReducer(state = INITIAL_STATE, action) {
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
