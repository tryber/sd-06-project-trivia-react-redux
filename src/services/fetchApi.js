export const fetchTokenTrivia = () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  return fetch(endpoint)
    .then((response) => console.log(response.json()))
    .then((data) => data);
};

export const fetchQuestionsTrivia = (questions, token) => {
  const endpoint = `https://opentdb.com/api.php?amount=${questions}&token=${token}`;
  return fetch(endpoint)
    .then((response) => response.json());
};
