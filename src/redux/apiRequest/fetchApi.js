export const apiTokenFetch = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const getObj = await fetch(URL);
  const getJson = await getObj.json();
  return getJson;
};

export const apiQuestionsFetch = async () => {
  const URL = 'https://opentdb.com/api.php?amount=5';
  const getObj = await fetch(URL);
  const getJson = await getObj.json();
  return getJson;
};
