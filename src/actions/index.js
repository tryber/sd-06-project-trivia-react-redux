export const REQUEST = 'REQUEST';
export const DATA = 'DATA';
export const DATA_QUESTIONS = 'DATA_QUESTIONS';
export const FAILURE = 'FAILURE';
export const RECEIVE_HASH = 'RECEIVE_HASH';
export const PLAYER_NAME = 'PLAYER_NAME';

export const PLAYERDADOS = 'PLAYERDADOS';
export const GIVE_ANSWER = 'GIVE_ANSWER';
export const GIVE_SCORE = 'GIVE-SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';

const apiToken = 'https://opentdb.com/api_token.php?command=request';

export function request() {
  return {
    type: REQUEST,
  };
}

export function requestSuccess(data) {
  return {
    type: DATA,
    data,
  };
}

export function requestFailure(error) {
  return {
    type: FAILURE,
    error,
  };
}

export function requestQuestionsSuccess(questions) {
  return {
    type: DATA_QUESTIONS,
    questions,
  };
}

export function receiveHash(hash) {
  return {
    type: RECEIVE_HASH,
    hash,
  };
}

export function playerName(name, email) {
  return {
    type: PLAYER_NAME,
    name,
    email,
  };
}

export const dadosJogador = (name, email) => ({
  type: PLAYERDADOS,
  name,
  email,
});

export const answerQuestions = () => ({
  type: GIVE_ANSWER,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const giveScore = (value) => ({
  type: GIVE_SCORE,
  value,
});

export function fetchApiQuestions(token) {
  const endpoint = `https://opentdb.com/api.php?amount=${1}&token=${token}`;
  return (dispatch) => {
    dispatch(request());
    return fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return dispatch(requestQuestionsSuccess(data));
      },
      (error) => dispatch(requestFailure(error.message)));
  };
}

export function fetchApiToken() {
  return (dispatch) => {
    dispatch(request());
    return fetch(apiToken)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(requestSuccess(data));
        dispatch(fetchApiQuestions(data.token));
        localStorage.setItem('token', data.token);
      },
      (error) => dispatch(requestFailure(error.message)));
  };
}
