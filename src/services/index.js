export default fetchApi = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
);
