import { EMAIL_INPUT } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_INPUT:
    return {
      ...state, email: action.email,
    };
  default:
    return state;
  }
}
