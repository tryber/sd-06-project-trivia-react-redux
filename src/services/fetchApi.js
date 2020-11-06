const API = 'https://opentdb.com/api_token.php?command=request';
const API_QUESTIONS = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchTokenApi = () => fetch(API)
  .then((response) => response.json());

export const fetchQuestionsApi = (token) => fetch(API_QUESTIONS + token)
  .then((response) => response.json());
