export default function fetchGameQuestions() {
  const TOKEN = localStorage.getItem('token');
  console.log(TOKEN);
  const ENDPOINT = 'https://opentdb.com/api.php?';
  const AMOUNT_OPTION = 'amount=5';
  const TOKEN_OPTION = `&token=${TOKEN}`;
  const FETCH_URL = `${ENDPOINT}${AMOUNT_OPTION}${TOKEN_OPTION}`;

  return fetch(FETCH_URL)
    .then((response) => response.json())
    .catch((error) => error);
}
