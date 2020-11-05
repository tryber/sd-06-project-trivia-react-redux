const API = 'https://opentdb.com/api_token.php?command=request';

const fetchTokenApi = () => fetch(API)
  .then((response) => response.json());

export default fetchTokenApi;
