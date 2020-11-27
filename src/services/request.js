const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';
const five = 5;
let category = '';

export async function apiCategory() {
  const categoryApi = await fetch('https://opentdb.com/api_category.php');
  const categoryJson = await categoryApi.json();
  console.log('categoryJson', categoryJson)

  const { trivia_categories } = categoryJson;
  return trivia_categories;
}

export async function apiQuestions(token, numberQuestions = five) {
  const requestApiQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}&category=${category}`);
  const requestJsonQuestions = await requestApiQuestions.json();

  return requestJsonQuestions;
}

export async function apiToken() {
  const requestApiToken = await fetch(TOKEN_API);
  const requestJsonToken = await requestApiToken.json();

  const { token } = requestJsonToken;
  console.log(token)
  const questions = await apiQuestions(token);

  return { token, questions };
}
