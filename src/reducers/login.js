/*
uma funct que recebe um state global e retorna
um novo state baseado no TYPE da action.
*/
import md5 from 'crypto-js/md5';

import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  imageProfile: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
      imageProfile: `https://www.gravatar.com/avatar/${md5(action.email)}`,
    };
  default:
    return state;
  }
}
