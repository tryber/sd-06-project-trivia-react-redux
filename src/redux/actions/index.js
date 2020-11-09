export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const SAVE_PLAYER_DATA = 'SAVE_PLAYER_DATA';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TIMER_RESET = 'TIMER_RESET';
export const TIMER_STOP = 'TIMER_STOP';
export const TIMER_START = 'TIMER_START';
export const TIMER_LOST = 'TIMER_LOST';

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

export const timerStart = () => ({
  type: TIMER_START,
  startCount: true,
  stopCount: false,
  resetCount: false,
})

export const timerReset = () => ({
  type: TIMER_RESET,
  stopCount: false,
  resetCount: true,
  startCount: false,
});

export const timerStop = () => ({
  type: TIMER_STOP,
  stopCount: true,
  resetCount: false,
  startCount: true,
});

export const timerLost = () => ({
  type: TIMER_LOST,
});