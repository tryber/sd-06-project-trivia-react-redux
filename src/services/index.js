export const reqToken = async () => {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await api.json();
  return data;
};

export const reqQuestions = async (token) => {
  const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await api.json();
  return data;
};
