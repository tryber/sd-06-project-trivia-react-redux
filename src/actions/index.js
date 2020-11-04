export const LOGIN = 'LOGIN';

export const login = (email, token) => ({
  type: LOGIN,
  email,
  token,
});

export function fetchToken(email) {
  return async (dispatch) => {
    const tokenData = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJSON = await tokenData.json();
    localStorage.setItem('token', JSON.stringify(tokenJSON));
    dispatch(login(email, tokenJSON));
  };
}
