import { loadState } from '../../services/localStorage';
import { ADD_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: loadState('token', ''),
};

function userInformation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
}

export default userInformation;
