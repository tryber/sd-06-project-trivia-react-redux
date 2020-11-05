import { getToken } from '../services';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SCORE = 'USER_SCORE';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_TOKEN_SUCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';

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
