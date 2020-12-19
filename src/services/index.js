export const getToken = async () => {
  const apiRequest = await fetch('https://opentdb.com/api_token.php?command=request');
  const apiResponse = await apiRequest.json();
  return apiResponse;
};

export const getTrivia = async (token) => {
  const apiRequest = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await apiRequest.json();
  return questions;
};
