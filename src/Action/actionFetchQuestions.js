export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestions(question) {
  return { type: GET_QUESTIONS, question };
}

export function responseQuestions() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const responseAPI = await fetch(endpoint);
    const result = await responseAPI.json();

    dispatch(getQuestions(result));
  };
}
