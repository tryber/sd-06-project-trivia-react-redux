const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';
const five = 5;

export async function apiQuestions(token, numberQuestions = five) {
  const requestApiQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`);
  const requestJsonQuestions = await requestApiQuestions.json();

  return requestJsonQuestions;
}

export async function apiToken() {
  const requestApiToken = await fetch(TOKEN_API);
  const requestJsonToken = await requestApiToken.json();

  const { token } = requestJsonToken;
  const questions = await apiQuestions(token);

  return { token, questions };
}
