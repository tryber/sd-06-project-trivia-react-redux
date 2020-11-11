/*
É um objeto com a propriedade TYPE obrigatória
e os parametros desejados para serem usadas
pelos DISPATCHS (mapDispatchToProps)
Boa pratica é criar uma função que retorna a action(objeto)!

payload é convenção. está email como no Readme.
*/

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const PLAYER_DATA = 'PLAYER_DATA';
export const RANKING = 'RANKING';
export const SCORED_POINT = 'SCORED_POINT';
export const ANSWERED = 'ANSWERED';
export const RESET_SCORE = 'RESET_SCORE';

const requestToken = 'https://opentdb.com/api_token.php?command=request';
const requestQuestions = 'https://opentdb.com/api.php?amount=5&category=31&token=';

export const actionLogin = ({ email, name }) => ({
  type: LOGIN,
  email,
  name,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const scoreAction = (score) => ({
  type: SCORED_POINT,
  score: score.score,
  answered: score.answered,
  timeout: score.timeout,
  assertions: score.assertions,
});

export const answerAction = (payload) => ({
  type: ANSWERED,
  time: payload.time,
  answered: payload.answered,
  timeout: payload.timeout,
});

export const playerData = (payload) => ({
  type: PLAYER_DATA,
  name: payload.name,
  score: payload.score,
  timeout: payload.timeout,
  time: payload.time,
});

export const rankingAction = (payload) => ({
  type: RANKING,
  name: payload.name,
  score: payload.score,
  avatar: payload.avatar,
  assertions: payload.assertions,
});

export const resetScoreAction = () => ({
  type: RESET_SCORE,
});

export const getQuestionsAction = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const getQuestions = (token) => async (dispatch) => {
  const apiQuestions = await fetch(`${requestQuestions}${token}`);
  const results = await apiQuestions.json();
  return dispatch(getQuestionsAction(results));
};

export const fetchToken = () => async (dispatch) => {
  const apiAnswer = await fetch(requestToken);
  const token = await apiAnswer.json();
  localStorage.setItem('token', token.token);
  await dispatch(tokenAction(token.token));
  return dispatch(getQuestions(token.token));
};
