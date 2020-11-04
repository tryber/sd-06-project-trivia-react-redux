export const login = (email) => ({
  type: 'LOGIN_USER',
  email,
});

export const token = (token) => ({
  type: 'TOKEN_SUCCESS',
  token,
})

export const thunkToken = () => async (dispatch) => {
  const responseFromAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const payload = await responseFromAPI.json().token;
  dispatch(token(payload));
};