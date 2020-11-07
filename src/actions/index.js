import { getToken, getTrivia } from '../services';

export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_TOKEN_SUCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';
export const SEND_LOGIN = 'SEND_LOGIN';
export const SEND_SCORE = 'SEND_SCORE';
export const SEND_ASSERTIONS = 'SEND_ASSERTIONS';
export const QUESTION = 'QUESTION';

export const login = (email, name) => ({
  type: SEND_LOGIN,
  email,
  name,
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  score,
});

export const sendAssertions = (assertions) => ({
  type: SEND_ASSERTIONS,
  assertions,
});

const requestToken = () => ({
  type: FETCH_TOKEN,
});

export const requestTokenSucess = (token) => ({
  type: FETCH_TOKEN_SUCESS,
  token,
});

export const requestTokenError = (error) => ({
  type: FETCH_TOKEN_ERROR,
  error,
});

export const requestQuestions = (questions) => ({
  type: QUESTION,
  questions,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  const requestfromAPI = await getToken();
  const { token } = requestfromAPI;
  try {
    dispatch(requestTokenSucess(token));
  } catch (e) {
    dispatch(requestTokenError(e.message));
  }
};

export const fetchQuestions = () => async (dispatch, getState) => {
  const { apiReducer: { token } } = getState();

  const requestfromAPI = await getTrivia(token);

  dispatch(requestQuestions(requestfromAPI.results));

  // const typeError = 3;
  // let newToken = '';

  // if (requestfromAPI.response_code === typeError) {
  //   newToken = await getToken();
  //   requestfromAPI = await getTrivia(newToken.token);
  // }

  // if (newToken !== '') {
  //   dispatch(newToken.token);
  // } else {
  //   dispatch(token);
  // }
};
