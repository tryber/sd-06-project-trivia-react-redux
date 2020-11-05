export const LOGIN = 'LOGIN';
export const QUESTIONS = 'QUESTIONS';

export const login = (email, token) => ({
  type: LOGIN,
  email,
  token,
});

export const receiveQuestions = (questions) => ({
  type: QUESTIONS,
  questions,
});

export function fetchToken(email) {
  return async (dispatch) => {
    const tokenData = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJSON = await tokenData.json();
    localStorage.setItem('token', JSON.stringify(tokenJSON));
    dispatch(login(email, tokenJSON));
  };
}

export function fetchQuestion(token) {
  console.log('fetch' + token);
  return async (dispatch) => {
    const questionsData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJSON = await questionsData.json();
    localStorage.setItem('question', JSON.stringify(questionsJSON));
    dispatch(receiveQuestions(questionsJSON));
  };
}
