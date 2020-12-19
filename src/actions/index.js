export const LOGIN = 'LOGIN';
export const QUESTIONS = 'QUESTIONS';
export const SEND_SCORE = 'SEND_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const login = (email, token, playerName) => ({
  type: LOGIN,
  email,
  token,
  playerName,
});

export const receiveQuestions = (questions) => ({
  type: QUESTIONS,
  questions,
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  score,
});

const fetchToken = async () => {
  const tokenData = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenJSON = await tokenData.json();
  localStorage.setItem('token', JSON.stringify(tokenJSON));
  return tokenJSON;
};

const fetchQuestionsFromAPI = async (token) => {
  // console.log(token);
  const questionsData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questionsJSON = await questionsData.json();
  localStorage.setItem('question', JSON.stringify(questionsJSON));
  return questionsJSON;
};

// const fetchTokenFromLocalStorage = () => {
//   return JSON.parse(localStorage.getItem('token').token);
// };

export function fetchTokenAndLogin(email, playerName) {
  return async (dispatch) => {
    const token = await fetchToken();
    dispatch(login(email, token, playerName));
  };
}

export function fetchQuestion(token) {
  return async (dispatch) => {
    const questionsJSON = await fetchQuestionsFromAPI(token);
    dispatch(receiveQuestions(questionsJSON));
  };
}
