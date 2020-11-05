export function fetchAPITrivia() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  return fetch(endpoint)
    .then((resp) => resp.json());
}

export function fetchAPIQuestions() {
  // https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}
  // Recomendação
  // https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
  return '';
}
