import { SAVE_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
  image: '',
  nome: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INFO:
    return {
      ...state,
      email: action.email,
      image: action.image,
      nome: action.username,
    };
  default:
    return state;
  }
}
