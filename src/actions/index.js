import md5 from 'crypto-js/md5';

const UPDATE_PLAYER_INFO = 'UPDATE_PLAYER_INFO';
const UPDATE_PLAYER_TOKEN = 'UPDATE_PLAYER_TOKEN';

export const playerUpdate = (email, name) => ({
  type: UPDATE_PLAYER_INFO,
  email,
  name,
});

const updatePlayerToken = (token) => ({
  type: UPDATE_PLAYER_TOKEN,
  token,
});

export function getToken() {
  const apiEndpoint = 'https://opentdb.com/api_token.php?command=request';
  return async (dispatch) => {
    const tokenResponse = await fetch(apiEndpoint);

    return dispatch(updatePlayerToken(tokenResponse));
  };
}
