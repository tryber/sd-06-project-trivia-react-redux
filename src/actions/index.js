import { getSession } from '../services/api';

export const PLAY = 'PLAY';

export const play = (user, email, token) => ({
  type: PLAY,
  user,
  email,
  token,
});

export function fetchToken(user, email) {
  return async (dispatch) => {
    const token = await getSession()
      .then((json) => json.token);
    localStorage.setItem('token', token);
    dispatch(play(user, email, token));
  };
}
