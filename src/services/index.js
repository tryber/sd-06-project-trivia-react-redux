const reqToken = async () => {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await api.json();
  return data;
};

export default reqToken;
