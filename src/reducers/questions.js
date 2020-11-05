import { QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
};
//estado com todas as informações da api - necessário setar só o que preciso
const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  default:
    return state;
  }
};

export default questionReducer;