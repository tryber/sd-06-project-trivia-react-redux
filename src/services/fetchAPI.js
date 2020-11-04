export default function fetchAPI() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((resp) => resp.json());
}
