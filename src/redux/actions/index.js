export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const SAVE_PLAYER_DATA = 'SAVE_PLAYER_DATA';

export const receiveTokenSuccess = (data) => ({
  type: TOKEN_SUCCESS,
  data,
});

export const fetchTokenAPI = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(receiveTokenSuccess(data.token));
  localStorage.setItem('token', data.token);
};

export const savePlayerData = (data) => ({
  type: SAVE_PLAYER_DATA,
  data,
});
