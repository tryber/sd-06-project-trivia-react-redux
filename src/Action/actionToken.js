export const GET_TOKEN = 'GET_TOKEN';

export function getToken(token) {
  return { type: GET_TOKEN, token };
}

export function fetchToken() {
  return async (dispatch) => {
    const responseAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseJSON = await responseAPI.json();
    const { token } = responseJSON;

    dispatch(getToken(token));
  };
}
