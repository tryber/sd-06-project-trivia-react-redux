import { getToken, getQuestions } from '../services';

export const LOGIN = 'LOGIN';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const TOKEN_SUCESS = 'TOKEN_SUCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SUCESS_QUESTIONS = 'SUCESS_QUESTIONS';
export const QUESTIONS_ERROR = 'QUESTIONS_ERROR';
export const PONTOS_QUESTOES = 'PONTOS_QUESTOES';

export const loginUsers = (name, email) => ({
  type: LOGIN,
  name,
  email,
});

export const requestToken = () => ({
  type: FETCH_TOKEN,
});

export const tokenSucess = (token) => ({
  type: TOKEN_SUCESS,
  token,
});

export const tokenError = (error) => ({
  type: TOKEN_ERROR,
  error,
});

export const requestQuestions = () => ({
  type: FETCH_QUESTIONS,
});

export const sucessQuestions = (questions) => ({
  type: SUCESS_QUESTIONS,
  questions,
});

export const questionsError = (error) => ({
  type: QUESTIONS_ERROR,
  error,
});

export const solicitacaoToken = () => async (dispatch) => {
  dispatch(requestToken());
  const retornoDaAPI = await getToken();
  const { token } = retornoDaAPI;
  try {
    dispatch(tokenSucess(token));
  } catch (error) {
    dispatch(tokenError(error.message));
  }
};

export const solicitacaoQuestoes = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  const retornoDaAPI = await getQuestions(token);
  const { results } = retornoDaAPI;
  try {
    dispatch(sucessQuestions(results));
  } catch (error) {
    dispatch(questionsError(error));
  }
};

export const repassaPontos = (pontos) => ({
  type: PONTOS_QUESTOES,
  pontos,
});
