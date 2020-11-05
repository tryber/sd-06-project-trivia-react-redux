export const LOGIN = 'LOGIN';
export const QUESTIONS = 'QUESTIONS';

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

const fetchToken = async () => {
  const tokenData = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenJSON = await tokenData.json();
  localStorage.setItem('token', JSON.stringify(tokenJSON));
  return tokenJSON;
};

const fetchQuestionsFromAPI = async (token) => {
  const questionsData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questionsJSON = await questionsData.json();
  const RESPONSE_CODE_TOKEN_EXPIRED = 3;
  if (questionsJSON.response_code === RESPONSE_CODE_TOKEN_EXPIRED) {
    const newToken = await fetchToken();
    const newQuestionsData = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
    const newQuestionsJSON = await newQuestionsData.json();
    localStorage.setItem('question', JSON.stringify(newQuestionsJSON));
    return newQuestionsJSON;
  }
  localStorage.setItem('question', JSON.stringify(questionsJSON));
  return questionsJSON;
};

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
