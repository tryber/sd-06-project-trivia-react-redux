export default async function fetchAPI() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(endpoint);
  const response = await result.json();
  return response;
}
