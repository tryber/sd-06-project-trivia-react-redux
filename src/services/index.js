export function fetchToken() {
  const tokenAPI = 'https://opentdb.com/api_token.php?command=request';
  return fetch(tokenAPI)
    .then((resp) => resp.json());
}

export function fetchQuestions(numberOfQuestions, settings, token) {
  let questionsAPI = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  Object.keys(settings).forEach((key) => {
    questionsAPI += `&${key}=${settings[key]}`;
  });
  return fetch(questionsAPI)
    .then((resp) => resp.json());
}

export function fetchCategories() {
  const categoriesAPI = 'https://opentdb.com/api_category.php';
  return fetch(categoriesAPI)
    .then((response) => response.json());
}
