export function fetchToken() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => response.token);
}

export function fetchQuestions(token) {
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json());
}
