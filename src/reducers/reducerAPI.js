import {
  FETCH_TOKEN,
  TOKEN_SUCESS,
  TOKEN_ERROR,
  FETCH_QUESTIONS,
  SUCESS_QUESTIONS,
  QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

function reducerAPI(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
    };
  case TOKEN_SUCESS:
    // O método JSON.stringify() converte valores em javascript para uma String
    // JSON. Fonte: MDN. Usado no carrinho de compras
    localStorage.setItem('token', JSON.stringify(action.token));
    return {
      ...state,
      token: action.token,
    };
  case TOKEN_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case FETCH_QUESTIONS:
    return {
      ...state,
    };
  case SUCESS_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case QUESTIONS_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
}

export default reducerAPI;
