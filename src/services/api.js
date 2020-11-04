function fetchToken() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => response.token);
}

export default fetchToken;
