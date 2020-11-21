import { SAVE_REQUEST_INFO, RESET_REQUEST } from '../actions/index';

const initialState = {
  hash: '',
  questionsInfo: [],
};

function requestInfo(state = initialState, { type, hash, questionsInfo }) {
  switch (type) {
  case SAVE_REQUEST_INFO:
    return { ...state, hash, questionsInfo };
  case RESET_REQUEST:
    return initialState;
  default:
    return state;
  }
}

export default requestInfo;
