export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';

const requestSuccess = (questions) => ({
  type: TOKEN_SUCCESS,
  questions,
});

const fetchQuestions = (token, settings) => async (dispatch) => {
  let response = {};
  if (settings !== '') {
    const { amount, category, difficult, type } = settings;
    response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficult}&type=${type}&token=${token}`);
  } else {
    response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  }
  const data = await response.json();
  dispatch(requestSuccess(data));
};

export default fetchQuestions;
