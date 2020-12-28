import { UPDATE_AUTHENTICATION } from '../actions/authenticationAction';

const INITIAL_STATE = false;

const authenticationReducer = (state = INITIAL_STATE, action) => {
  const { type, authenticationStatus } = action;
  switch (type) {
  case UPDATE_AUTHENTICATION:
    return authenticationStatus;
  default:
    return state;
  }
};

export default authenticationReducer;
