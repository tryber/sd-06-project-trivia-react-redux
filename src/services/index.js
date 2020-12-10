export const getToken = async () => {
  const requisicaoAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const respostaAPI = await requisicaoAPI.json();
  return respostaAPI;
};

export const getQuestions = async (token) => {
  const requisicaoApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questoesAPI = await requisicaoApi.json();
  return questoesAPI;
};
