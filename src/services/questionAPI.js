export default function questionAPI(token) {
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((resp) => resp.json())
    .then((result) => result.results);
}
