export const TOKEN = 'TOKEN';

export const addToken = (token) => ({
  type: TOKEN,
  token,
});

export const fetchApi = () => async (dispatch) => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  const { token } = response;
  localStorage.setItem('token', token);
  dispatch(addToken(token));
};
