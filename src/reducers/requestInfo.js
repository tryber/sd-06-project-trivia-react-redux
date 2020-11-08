import { SAVE_REQUEST_INFO } from '../actions/index';

const initialState = {
  hash: '',
  questionsInfo: [],
};

function requestInfo(state = initialState, { type, hash, questionsInfo }) {
  switch (type) {
  case SAVE_REQUEST_INFO:
    return { ...state, hash, questionsInfo };
  default:
    return state;
  }
}

export default requestInfo;
