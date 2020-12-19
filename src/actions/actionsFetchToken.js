import fetchToken from '../services/fetchToken';

export const REQUESTING_TOKEN = 'REQUESTING_TOKEN';
export const FOUND_TOKEN = 'FOUND_TOKEN';
export const TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND';

function requestingToken() {
  return { type: REQUESTING_TOKEN };
}

function foundToken(token) {
  localStorage.setItem('token', token);
  return { type: FOUND_TOKEN, token };
}

function tokenNotFound(error) {
  return { type: TOKEN_NOT_FOUND, error };
}

export function tokenFetcher() {
  return (dispatch) => {
    dispatch(requestingToken());
    return fetchToken()
      .then(
        (response) => dispatch(foundToken(response.token)),
        (error) => dispatch(tokenNotFound(error.message)),
      );
  };
}
