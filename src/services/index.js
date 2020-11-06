export function fetchAPITrivia() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  return fetch(endpoint)
    .then((resp) => resp.json());
}

export function fetchAPIQuestions(token) {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return fetch(endpoint)
    .then((resp) => resp.json());
}
