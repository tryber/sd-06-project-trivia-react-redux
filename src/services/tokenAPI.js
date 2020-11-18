const APIURL = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = () => (
  fetch(APIURL)
    .then((response) => response.json())
    .then((json) => json.token)
);

export default tokenAPI;
