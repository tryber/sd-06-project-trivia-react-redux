export const LOGIN = 'LOGIN';

export const userLogin = (userInfo) => ({
  type: LOGIN,
  payload: userInfo,
});
