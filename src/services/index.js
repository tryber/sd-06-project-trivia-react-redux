export default (token) => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
);

export const fetchGravatar = (hash) => (
  fetch(`https://www.gravatar.com/avatar/${hash}`)
    .then((response) => response.json())
    .then((response) => console.log(response))
);

