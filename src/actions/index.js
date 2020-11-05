export const LOGIN = 'LOGIN';

export const loginAction = (email, name) => ({
  type: LOGIN,
  email,
  name,
});
