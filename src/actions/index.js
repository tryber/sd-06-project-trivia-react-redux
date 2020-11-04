export const UPDATE_PLAYER_TOKEN = 'UPDATE_PLAYER_TOKEN';

const updatePlayerToken = (token) => ({
  type: UPDATE_PLAYER_TOKEN,
  token,
});

export function getToken() {
  const apiEndpoint = 'https://opentdb.com/api_token.php?command=request';
  return async (dispatch) => {
    const tokenResponse = await fetch(apiEndpoint);
    const tokenJson = await tokenResponse.json();
    localStorage.setItem('token', tokenJson.token);
    return dispatch(updatePlayerToken(tokenJson.token));
  };
}
