import { getSession } from '../services/api';

export const PLAY = 'PLAY';

export const play = (user, email, token) => ({
  type: PLAY,
  user,
  email,
  token,
});

export function fetchToken(user, email) {
  if (localStorage.getItem('token') !== null) {
    return async (dispatch) => {
      const token = localStorage.getItem('token');
      localStorage.setItem('token', token);
      dispatch(play(user, email, token));
    };
  }
  return async (dispatch) => {
    await getSession()
      .then((json) => json.token)
      .then((token) => localStorage.setItem('token', token));
    dispatch(play(user, email));
  };
}
