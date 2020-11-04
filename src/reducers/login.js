/*
uma funct que recebe um state global e retorna
um novo state baseado no TYPE da action.
*/

import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
