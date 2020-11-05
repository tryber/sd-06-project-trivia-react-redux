export const LOGIN = 'LOGIN';

export const login = (email, token, playerName) => ({
  type: LOGIN,
  email,
  token,
  playerName,
});

export function fetchToken(email, playerName) {
  return async (dispatch) => {
    const tokenData = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJSON = await tokenData.json();
    localStorage.setItem('token', JSON.stringify(tokenJSON));
    dispatch(login(email, tokenJSON, playerName));
  };
}
