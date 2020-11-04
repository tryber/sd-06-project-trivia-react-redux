function fetchAPI() {
  const endpoint = 'https://something.com.br/json/all';
  return fetch(endpoint)
    .then((resp) => resp.json());
}

export default fetchAPI;
