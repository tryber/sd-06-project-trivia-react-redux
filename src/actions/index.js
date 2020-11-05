export const UPDATE_PLAYER_TOKEN = 'UPDATE_PLAYER_TOKEN';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';

export const updatePlayerToken = (token) => ({
  type: UPDATE_PLAYER_TOKEN,
  token,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,  
  questions,
});

// export function getToken(dispatch) {
//   const apiEndpoint = 'https://opentdb.com/api_token.php?command=request';
//   return async (dispatch) => {
//     const tokenResponse = await fetch(apiEndpoint);
//     const tokenJson = await tokenResponse.json();
//     localStorage.setItem('token', tokenJson.token);
//     return dispatch(updatePlayerToken(tokenJson.token));
//   };
// }

export const getToken = (dispatch) => async () => {
  const apiEndpoint = 'https://opentdb.com/api_token.php?command=request';
  const tokenJson = await (await fetch(apiEndpoint)).json();
  dispatch(updatePlayerToken(tokenJson.token));
  localStorage.setItem('token', tokenJson.token);
};

export const fetchQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const apiEndpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const questions = await (await fetch(apiEndpoint)).json();
  dispatch(addQuestions(questions));
};
