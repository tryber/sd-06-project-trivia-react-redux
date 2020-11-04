export default () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => response.token)
    .then((response) => localStorage.setItem('token', response))
);
