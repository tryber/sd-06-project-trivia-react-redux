async function getToken() {
  const API = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await API.json();
  return token;
}

export default getToken;