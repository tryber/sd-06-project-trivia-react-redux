import { LOGIN, PONTOS_QUESTOES } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  email: '',
  score: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case PONTOS_QUESTOES:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: action.pontos,
    };
  default:
    return state;
  }
}
