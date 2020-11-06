export function fetchAPITrivia() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  return fetch(endpoint)
    .then((resp) => resp.json());
}

export function fetchAPIQuestions(token) {
  const numberOfQuestions = 5;
  const endpoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  return fetch(endpoint)
    .then((resp) => resp.json());
}
