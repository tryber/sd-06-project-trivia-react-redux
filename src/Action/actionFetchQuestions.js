export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

export function responseQuestions() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const responseAPI = await fetch(endpoint);
    const { results } = await responseAPI.json();
    const replaceQuotResults = results.map((result) => ({
      ...result,
      question: result.question.replace(/(&quot;)|(&#039;)/g, '\''),
    }));

    return dispatch(getQuestions(replaceQuotResults));
  };
}
