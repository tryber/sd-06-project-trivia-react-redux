import fetchTokenAPI from '../service/fetchAPI';

export const GET_TOKEN = 'GET_TOKEN';

export function getToken(token) {
  return { type: GET_TOKEN, token };
}

export function responseToken() {
  return async (dispatch) => {
    const result = await fetchTokenAPI();
    const { token } = result;

    dispatch(getToken(token));
  };
}
