import questionsAPI from '../services/questionAPI';

export const LOGIN = 'LOGIN';
export const QUESTION = 'QUESTION';

export const loginAction = (email, username) => ({
  type: LOGIN,
  email,
  username,
});

export const questionsAction = (questions) => ({
  type: QUESTION,
  questions,
});

export const questionsThunk = () => async (dispatch) => {
  const tokenLocal = localStorage.getItem('token');
  const questionsReturn = await questionsAPI(tokenLocal);
  // console.log(questionsReturn);
  dispatch(questionsAction(questionsReturn));
};
