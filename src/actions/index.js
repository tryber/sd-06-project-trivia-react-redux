export const UPDATE_PLAYER_TOKEN = 'UPDATE_PLAYER_TOKEN';

const updatePlayerToken = (token) => ({
  type: UPDATE_PLAYER_TOKEN,
  token,
});

export function getToken() {
  const apiEndpoint = 'https://opentdb.com/api_token.php?command=request';
  return async (dispatch) => {
    const tokenResponse = await fetch(apiEndpoint);
    const tokenJson = await tokenResponse.json();
    localStorage.setItem('token', tokenJson.token);
    return dispatch(updatePlayerToken(tokenJson.token));
  };
}

export const addQuestions = (questions) => ({
  type: 'ADD_QUESTIONS',
  questions,
});

export const fetchQuestions = () => async (dispatch) => {
  const token = '';
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  dispatch(addQuestions(data));
};
