export const REQUEST = 'REQUEST';
export const DATA = 'DATA';
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

export function fetchApiToken() {
  return (dispatch) => {
    dispatch(request());
    return fetch(apiToken)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return dispatch(requestSuccess(data));
      },
      (error) => dispatch(requestFailure(error.message)));
  };
}

export const RECEIVE_HASH = 'RECEIVE_HASH';

export function receiveHash(hash) {
  return {
    type: RECEIVE_HASH,
    hash,
  };
}

export const PLAYER_NAME = 'PLAYER_NAME';

export function playerName(name, email) {
  return {
    type: PLAYER_NAME,
    name,
    email,
  };
}
