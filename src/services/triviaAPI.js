export default async function triviaAPI(amount) {
  const token = localStorage.getItem('token');
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
  const result = await fetch(endpoint);
  const response = await result.json();
  return response;
}
