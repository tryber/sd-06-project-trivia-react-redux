export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';

const requestSuccess = (questions) => ({
  type: TOKEN_SUCCESS,
  questions,
});

const fetchQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  dispatch(requestSuccess(data));
};

export default fetchQuestions;
