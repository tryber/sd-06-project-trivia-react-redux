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
