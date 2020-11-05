export async function getAccessToken() {
  const tokenUrl = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(tokenUrl);
  const { token } = await response.json();

  return token;
}

const defaultOfQuestions = 5;

export async function getTriviaQuestion(
  token, numberOfQuestions = defaultOfQuestions,
) {
  const triviaUrl = `
  https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}
  `;

  const response = await fetch(triviaUrl);
  const { results } = await response.json();

  return results;
}
