import md5 from 'crypto-js/md5';

export const SAVE_INFO = 'SAVE_INFO';

export const SAVE_TOKEN = 'SAVE_TOKEN';

export const TOKEN_QUESTION = 'TOKEN_QUESTION';

const tokenQuestion = (question) => ({
  type: TOKEN_QUESTION,
  question,
});

const getUser = (email, image, username) => ({
  type: SAVE_INFO,
  email,
  image,
  username,
});

const getToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});
export const getQuestion = (token) => async (dispatch) => {
  const fetchQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questionResponse = await fetchQuestion.json();
  await dispatch(tokenQuestion(questionResponse));
};

export const getUserToken = () => async (dispatch) => {
  const fetchToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenResponse = await fetchToken.json();
  await dispatch(getToken(tokenResponse.token));
  localStorage.setItem('token', JSON.stringify(tokenResponse.token));
};

export const getUserAction = (email, username) => async (dispatch) => {
  const fetchApi = await fetch(`https://www.gravatar.com/avatar/${md5(email).toString()}`);
  await dispatch(getUser(email, fetchApi.url, username));
};
