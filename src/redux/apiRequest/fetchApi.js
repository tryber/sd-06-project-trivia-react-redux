const apiTokenFetch = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const getObj = await fetch(URL);
  const getJson = await getObj.json();
  return getJson;
};

export default apiTokenFetch;
