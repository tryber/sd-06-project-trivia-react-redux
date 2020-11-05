// import reducers from ".";
import { REQUEST, DATA } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  token: '',
  error: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case DATA:
    return {
      isFetching: false,
      token: action.data,
    };
  default:
    return state;
  }
}

export default tokenReducer;
