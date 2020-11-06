//  import fetchAPI from '../services/fetchAPI';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const USER_INFO = 'USER_INFO';
export const USER_SCORE = 'USER_SCORE';
export const USER_RANKING = 'USER_RANKING';
export const QUESTION_LIST = 'QUESTION_LIST';

export const tokenRequest = (token) => ({
  type: TOKEN_REQUEST,
  token,
});

export const userInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const userScore = (score, assertions) => ({
  type: USER_SCORE,
  score,
  assertions,
});

export const userRanking = (ranking) => ({
  type: USER_RANKING,
  ranking,
});

export const requestQuestions = (questions) => ({
  type: QUESTION_LIST,
  questions,
});
