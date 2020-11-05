export default () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => response.token)
    .then((response) => localStorage.setItem('token', response))
);

export const fetchQuestions = (token) => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
);
