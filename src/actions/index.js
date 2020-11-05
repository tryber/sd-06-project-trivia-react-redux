import { fetchAPITrivia } from '../services';

export const LOGIN = 'LOGIN';
export const login = (userData) => ({ type: LOGIN, userData });

export const TOKEN = 'TOKEN';
export const sendToken = (token) => ({ type: TOKEN, token });

export const SCORE = 'SCORE';
export const sendScore = (score) => ({ type: SCORE, score });

export function handleToken() {
  return async (dispatch) => {
    const tokenResponse = await fetchAPITrivia();
    dispatch(sendToken(tokenResponse));
    localStorage.setItem('token', tokenResponse.token);
  };
}
