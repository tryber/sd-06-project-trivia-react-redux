import tokenAPI from '../services/tokenAPI';
import mainAPI from '../services/mainAPI';

export const PLAY_GAME = 'PLAY_GAME';
export const GET_API = 'GET_API';

const getApi = (answer) => ({
  type: GET_API,
  answer,
});

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

export function fetchApi() {
  return async (dispatch, getState) => {
    const { user: { token } } = getState();
    const answer = await mainAPI(token);
    dispatch(getApi(answer));
  };
}
