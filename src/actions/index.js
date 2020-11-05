export const addQuestions = (questions) => ({
  type: 'ADD_QUESTIONS',
  questions,
});

export const fetchQuestions = () => async (dispatch) => {
  const token = '';
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  dispatch(addQuestions(data));
};
