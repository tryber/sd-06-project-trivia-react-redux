import { fetchAPITrivia, fetchAPIQuestions } from '../services';

export const LOGIN = 'LOGIN';
export const login = (userData) => ({ type: LOGIN, userData });

export const TOKEN = 'TOKEN';
export const sendToken = (token) => ({ type: TOKEN, token });

export const QUESTIONS = 'QUESTIONS';
export const sendQuestions = (questions) => ({ type: QUESTIONS, questions });

export const SCORE = 'SCORE';
export const sendScore = (score) => ({ type: SCORE, score });

export const ASSERTIONS = 'ASSERTIONS';
export const sendAssertions = (assertions) => ({ type: ASSERTIONS, assertions });

export function handleToken() {
  return async (dispatch) => {
    const tokenObjResponse = await fetchAPITrivia();
    const tokenCode = tokenObjResponse.token;
    dispatch(sendToken(tokenCode));
    localStorage.setItem('token', tokenCode);
  };
}

export function getQuestions(token) {
  return async (dispatch) => {
    const questionObject = await fetchAPIQuestions(token);
    dispatch(sendQuestions(questionObject));
  };
}

export function updateScoreAndAssertions(score, assertions) {
  return (dispatch, setState) => {
    const { name, email } = setState().user;
    dispatch(sendAssertions(assertions));
    dispatch(sendScore(score));
    const playerObject = { player: { name, gravatarEmail: email, score, assertions } };
    localStorage.setItem('state', JSON.stringify(playerObject));
  };
}
