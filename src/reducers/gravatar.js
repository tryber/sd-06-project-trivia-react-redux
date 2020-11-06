import { GRAVATAR } from '../actions/index';

const INITIAL_STATE = { gravatar: '' };

const gravatarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAR:
    return { ...state, gravatar: action.payload };
  default:
    return state;
  }
};

export default gravatarReducer;
