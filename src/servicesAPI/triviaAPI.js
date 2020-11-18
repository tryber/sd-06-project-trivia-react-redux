const tokenURL = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = () => fetch(tokenURL)
  .then((response) => response.json())
  .then((r) => {
    localStorage.setItem('token', r.token);
    return ({ token: r.token, date: new Date() });
  })
  .catch(() => {
    localStorage.setItem('token', 'ERROR_TOKEN');
    return ({ token: 'ERROR_TOKEN', date: 'ERROR_TOKEN' });
  });

const questionsBaseURL = 'https://opentdb.com/api.php?';
const defaultAmount = 5;

const questionsAPI = (amount = defaultAmount, token) => {
  const questionsURL = `${questionsBaseURL}amount=${amount}&token=${token}`;
  return fetch(questionsURL)
    .then((response) => response.json())
    .then((r) => r.results)
    .catch(() => 'ERROR_QUESTIONS');
};

export { tokenAPI, questionsAPI };
