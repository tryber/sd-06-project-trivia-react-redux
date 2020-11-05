const fetchTokenAPI = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const responseAPI = await fetch(endpoint);
  const responseJSON = await responseAPI.json();

  return responseJSON;
};

export default fetchTokenAPI;
