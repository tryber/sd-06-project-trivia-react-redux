import fetchToken from './fetchToken';

export default async function fetchGameQuestions(difficulty, category, type) {
  let token = localStorage.getItem('token');

  if (token === null) {
    const API_RESPONSE = await fetchToken();
    token = API_RESPONSE.token;

    localStorage.setItem('token', token);
  }

  const ENDPOINT = 'https://opentdb.com/api.php?';
  const AMOUNT_OPTION = 'amount=5';
  const TOKEN_OPTION = `&token=${token}`;
  const FETCH_URL = `${ENDPOINT}${AMOUNT_OPTION}${TOKEN_OPTION}
  ${difficulty}${category}${type}`;

  return fetch(FETCH_URL)
    .then((response) => response.json())
    .catch((error) => error);
}
