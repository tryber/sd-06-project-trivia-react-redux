export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';

const requestSuccess = (questions) => ({
  type: TOKEN_SUCCESS,
  questions,
});

const fetchQuestions = (token, settings) => async (dispatch) => {
  const {amount, category, difficult, type} = settings
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficult}&type=${type}&token=${token}`);
  console.log(data);
  const data = await response.json();
  dispatch(requestSuccess(data));
};

export default fetchQuestions;
