export const REQUEST = 'REQUEST';
export const DATA = 'DATA';
export const DATA_QUESTIONS = 'DATA_QUESTIONS';
export const FAILURE = 'FAILURE';
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
