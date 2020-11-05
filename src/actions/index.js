import { getToken } from '../services';

export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_TOKEN_SUCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';
export const SEND_LOGIN = 'SEND_LOGIN';

export const login = (email, name) => ({
  type: SEND_LOGIN,
  email,
  name,
});

const requestToken = () => ({
  type: FETCH_TOKEN,
});

export const requestTokenSucess = (token) => ({
  type: FETCH_TOKEN_SUCESS,
  token,
});

export const requestTokenError = (error) => ({
  type: FETCH_TOKEN_ERROR,
  error,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const requestfromAPI = await getToken();
  const { token } = requestfromAPI;
  try {
    dispatch(requestTokenSucess(token));
  } catch (e) {
    dispatch(requestTokenError(e.message));
  }
};
