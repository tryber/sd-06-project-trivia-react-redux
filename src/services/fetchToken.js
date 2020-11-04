const URL = 'https://opentdb.com/api_token.php?command=request';
const fetchToken = () => (
  fetch(URL)
    .then((response) => (
      response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);
export default fetchToken;
