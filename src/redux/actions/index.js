export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const SAVE_PLAYER_DATA = 'SAVE_PLAYER_DATA';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const SAVE_TIME_LEFT = 'SAVE_TIME_LEFT';

export const receiveTokenSuccess = (data) => ({
  type: TOKEN_SUCCESS,
  data,
  loading: false,
});

export const requestToken = () => ({
  type: TOKEN_REQUEST,
  loading: true,
});

export const fetchTokenAPI = () => async (dispatch) => {
  dispatch(requestToken());
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(receiveTokenSuccess(data));
  localStorage.setItem('token', data.token);
};

export const savePlayerData = (data) => ({
  type: SAVE_PLAYER_DATA,
  data,
});

export const receiveQuestionsSuccess = (data) => ({
  type: QUESTIONS_SUCCESS,
  data,
});

export const fetchQuestionsAPI = (endpoint) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${endpoint}`);
  const data = await response.json();
  dispatch(receiveQuestionsSuccess(data.results));
};

export const addPoints = (points) => ({
  type: 'SCORE',
  points,
});

export const saveTimeLeft = (seconds) => ({
  type: SAVE_TIME_LEFT,
  seconds,
});

export const toggleStopwatch = () => ({
  type: 'TOGGLE_STOPWATCH',
});

export const saveShuffledAnswers = (shuffledAnswers) => ({
  type: 'SAVE_SHUFFLED_ANSWERS',
  shuffledAnswers,
});

export const toggleShuffled = () => ({
  type: 'TOGGLE_SHUFFLED',
});

export const toggleBtns = () => ({
  type: 'TOGGLE_BUTTONS',
});

export const renderNextQuestionBtn = () => ({
  type: 'TOGGLE_NEXT_QUESTION',
});
