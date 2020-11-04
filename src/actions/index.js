import tokenAPI from '../services/tokenAPI';

export const PLAY_GAME = 'PLAY_GAME';

const playTheGame = (name, email, token) => ({
  type: PLAY_GAME,
  name,
  email,
  token,
});

export function enterUser(name, email) {
  return async (dispatch) => {
    const token = await tokenAPI();
    localStorage.setItem('token', token);
    dispatch(playTheGame(name, email, token));
  };
}
