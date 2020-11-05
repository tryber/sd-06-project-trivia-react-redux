export function getSession() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const result = fetch(url)
    .then((response) => response.json());
  return result;
}

export function codeClimate(a, b) {
  return a + b;
}
