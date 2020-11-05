export const LOGIN = 'LOGIN';

export const loginAction = (email, username) => ({
  type: LOGIN,
  email,
  username,
});
