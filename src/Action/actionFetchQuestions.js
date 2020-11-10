export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

export function responseQuestions() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const number = localStorage.getItem('number');
    const category = localStorage.getItem('category');
    const difficulty = localStorage.getItem('difficulty');
    const typeAPI = localStorage.getItem('typeAPI');

    const endpoint = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${typeAPI}&token=${token}`;
    console.log(endpoint);
    const responseAPI = await fetch(endpoint);
    const { results, response_code: responseCode } = await responseAPI.json();
    const replaceQuotResults = results.map((result) => ({
      ...result,
      question: result.question.replace(/(&quot;)|(&#039;)/g, '\''),
    }));

    localStorage.setItem('responseCode', responseCode);

    return dispatch(getQuestions(replaceQuotResults));
  };
}
