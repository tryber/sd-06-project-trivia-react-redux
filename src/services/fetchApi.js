export const fetchTokenTrivia = () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data);
};

export const fetchQuestionsTrivia = (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data);
};
