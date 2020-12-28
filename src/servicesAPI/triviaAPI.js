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

const questionsAPI = (configu) => {
  const { amount, category, difficulty, token, type } = configu;
  let amountAPI = (amount === '' || amount === 0 || amount === undefined)
    ? defaultAmount : amount;
  const magicNumberFifty = 50;
  if (amountAPI > magicNumberFifty) amountAPI = magicNumberFifty;
  let questionsURL = `${questionsBaseURL}amount=${amountAPI}&token=${token}`;
  if (type !== '' && type !== 'any') questionsURL += `&type=${type}`;
  if (category !== '' && category !== 'any') questionsURL += `&category=${category}`;
  if (difficulty !== '' && difficulty !== 'any') {
    questionsURL += `&difficulty=${difficulty}`;
  }
  return fetch(questionsURL)
    .then((response) => response.json())
    .then((r) => r.results)
    .catch(() => 'ERROR_QUESTIONS');
};

const getCategoriesAPI = () => {
  const categoriesURL = 'https://opentdb.com/api_category.php';
  return fetch(categoriesURL)
    .then((response) => response.json())
    .then((r) => r.trivia_categories)
    .catch(() => 'ERROR_QUESTIONS');
};

export { tokenAPI, questionsAPI, getCategoriesAPI };
