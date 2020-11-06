export const LOGIN = 'LOGIN';
export const GET_SCORE = 'GET_SCORE';
export const UPDATE_PLAYER_TOKEN = 'UPDATE_PLAYER_TOKEN';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const RENDER_TIME = 'RENDER_TIME';

export function getLogin(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}

export function playerScore(score) {
  return {
    type: GET_SCORE,
    score,
  };
}

export const updatePlayerToken = (token) => ({
  type: UPDATE_PLAYER_TOKEN,
  token,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

export const renderTime = () => ({
  type: RENDER_TIME,
});

export const getToken = () => async (dispatch) => {
  const apiEndpoint = 'https://opentdb.com/api_token.php?command=request';
  const tokenJson = await (await fetch(apiEndpoint)).json();
  dispatch(updatePlayerToken(tokenJson.token));
  localStorage.setItem('token', tokenJson.token);
};

export const fetchQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const apiEndpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const questions = await (await fetch(apiEndpoint)).json();
  dispatch(addQuestions(questions.results));
};
