export const LOGIN = 'LOGIN';
export const UPDATE_PLAYER_TOKEN = 'UPDATE_PLAYER_TOKEN';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RENDER_TIME = 'RENDER_TIME';
export const RESET_TIME = 'RESET_TIME';

export function getLogin(name, email) {
  localStorage.setItem('state', { player: { name, gravatarEmail: email } });
  return {
    type: LOGIN,
    name,
    email,
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

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const renderTime = () => ({
  type: RENDER_TIME,
});

export const resetTimer = () => ({
  type: RESET_TIME,
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
