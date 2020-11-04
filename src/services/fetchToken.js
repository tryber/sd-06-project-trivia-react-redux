export default async function fetchToken() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endpoint);
  const json = response.json();
  return json;
}
