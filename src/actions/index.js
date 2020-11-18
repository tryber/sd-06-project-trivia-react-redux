import { fetchTokenTrivia, fetchQuestionsTrivia } from '../services/fetchApi';

export const REQUEST = 'REQUEST';
export const DATA_TOKEN = 'DATA_TOKEN';
export const DATA_QUESTIONS = 'DATA_QUESTIONS';
export const FAILURE = 'FAILURE';
export const RECEIVE_HASH = 'RECEIVE_HASH';
export const PLAYER_NAME = 'PLAYER_NAME';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const GIVE_ANSWER = 'GIVE_ANSWER';
export const GIVE_SCORE = 'GIVE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

// Question Actions ------------------------------
export function request() {
  return {
    type: REQUEST,
  };
}

export function requestTokenSuccess(token) {
  return {
    type: DATA_TOKEN,
    token,
  };
}

export function requestQuestionsSuccess(questions) {
  return {
    type: DATA_QUESTIONS,
    questions,
  };
}

// User actions -------------------------------------
export function playerName(name, email) {
  return {
    type: PLAYER_NAME,
    name,
    email,
  };
}

export function nextQuestion() {
  return {
    type: NEXT_QUESTION,
  };
}

export function answerQuestion() {
  return {
    type: GIVE_ANSWER,
  };
}

export function giveScore(value) {
  return {
    type: GIVE_SCORE,
    value,
  };
}

export function resetScore() {
  return {
    type: RESET_SCORE,
  };
}

// Fetch functions ---------------------------------

export function fetchApiToken() {
  return (dispatch) => {
    dispatch(request());
    return fetchTokenTrivia()
      .then((data) => dispatch(requestTokenSuccess(data.token)));
  };
}

export function fetchApiQuestions(token) {
  return (dispatch) => {
    dispatch(request());
    return fetchQuestionsTrivia(token)
      .then((data) => dispatch(requestQuestionsSuccess(data)));
  };
}
