export const TOKEN = 'TOKEN';
export const USER = 'USER';
export const SCORE = 'SCORE';

export const addToken = (token) => ({
  type: TOKEN,
  token,
});

export const addName = (name) => ({
  type: USER,
  name,
});

export const addScore = (score) => ({
  type: SCORE,
  score,
});

export const fetchApi = () => async (dispatch) => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  const { token } = response;
  localStorage.setItem('token', token);
  dispatch(addToken(token));
};
