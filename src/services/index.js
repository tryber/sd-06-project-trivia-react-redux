import { addToken } from '../actions';

export const fetchQuestions = (token) => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
);
