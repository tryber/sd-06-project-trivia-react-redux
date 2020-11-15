import { QUESTION } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  questions: [],
};
// O que é o reducer? O reducer é uma função que retorna um novo estado baseado no type da action.
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTION:
    return { ...state, questions: action.questions };
  default:
    return state;
  }
}
