import fetchTokenApi from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const userLogin = (userInfo) => ({
  type: LOGIN,
  payload: userInfo,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

export function thunkToken() {
  return (dispatch) => (
    fetchTokenApi()
      .then((tokenInfo) => {
        dispatch(tokenAction(tokenInfo.token));
        localStorage.setItem('token', tokenInfo.token);
      })
  );
}
