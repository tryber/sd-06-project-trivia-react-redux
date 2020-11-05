import md5 from 'crypto-js/md5';

export const SAVE_INFO = 'SAVE_INFO';

export const SAVE_TOKEN = 'SAVE_TOKEN';

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
