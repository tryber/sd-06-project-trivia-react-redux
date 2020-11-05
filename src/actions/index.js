import { getToken } from '../services';

export const LOGIN = 'LOGIN';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const TOKEN_SUCESS = 'TOKEN_SUCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const loginUsers = (name, email) => ({
  type: LOGIN,
  name,
  email,
});

export const requestToken = () => ({
  type: FETCH_TOKEN,
});

export const tokenSucess = (token) => ({
  type: TOKEN_SUCESS,
  token,
});

export const tokenError = (error) => ({
  type: TOKEN_ERROR,
  error,
});

export const solicitacaoToken = () => async (dispatch) => {
  dispatch(requestToken());
  const retornoDaAPI = await getToken();
  const { token } = retornoDaAPI;
  try {
    dispatch(tokenSucess(token));
  } catch (error) {
    dispatch(tokenError(error.message));
  }
};
