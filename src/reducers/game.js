import { LOGIN, GET_SCORE } from '../actions';

const INICIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

function gameReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.name, gravatarEmail: action.email };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default gameReducer;
